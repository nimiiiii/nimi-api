from flask import Flask, request, send_from_directory
from lupa import LuaRuntime
from github import Github
from dotenv import load_dotenv
from base64 import b64decode
from app_routes import USING_FILE, USING_DIRECTORY
import logging
import sqlite3
import json
import os

load_dotenv()

app = Flask(__name__)
app.config["LOCALE"] = os.getenv("DATA_LOCALE", "en-US")
app.config["DEBUG"] = os.getenv("RELEASE_MODE", "production") != "production"

lua = LuaRuntime(unpack_returned_tuples = True)
os.makedirs(".data", exist_ok=True)

console = logging.StreamHandler()
console.setLevel(logging.INFO)

logging.basicConfig(filename=".data/log.txt", format="%(asctime)s [%(levelname)s] %(message)s", datefmt='%d-%b-%y %H:%M:%S', level=logging.INFO if not app.config.get("DEBUG") else logging.WARNING)
logging.getLogger('').addHandler(console)
logging.info("Initializing app...")

with sqlite3.connect(".data/storage.db") as db:
    db.execute("CREATE TABLE IF NOT EXISTS files (path TEXT PRIKARY KEY, sha TEXT NOT NULL)")

logging.info("Established database.")

github = Github(os.getenv("GITHUB_TOKEN"))
repository = github.get_repo(os.getenv("DATA_REPO"))

@app.route("/favicon.ico")
def favicon():
    return send_from_directory(os.path.join(app.root_path, "static"), "icon.ico", mimetype="image/x-icon")

@app.errorhandler(404)
def not_found(e):
    return send_as_json({ "error": "Not Found" }, 404)

@app.errorhandler(500)
def internal_error(e):
    return send_as_json({ "error": "Internal Server Error" }, 500)

for route, path in USING_FILE:
    def api_filterable(path = path):
        filters = request.args.to_dict()
        data = get_remote_file(path, transform_shared_cfg)

        if data is None:
            return send_as_json({ "error": "Not Found" }, 404)

        if len(filters) > 0:
            filtered = [e for e in data["entries"] if all(k in e and str(e[k]).strip().lower() == v.lower() for k, v in filters.items())]
            return send_as_json({ "entries": filtered })
        else:
            return send_as_json(data)

    app.add_url_rule(f"/api/{route}", route, api_filterable)

for route, path in USING_DIRECTORY:
    def api_queryable(path = path):
        key = request.args.get("id", type=str)

        return send_as_json(get_remote_file(os.path.join(path, key.lower() + ".lua"), transform_game_cfg)) if key != None else send_as_json({ "error": "Not Found" }, 404)

    app.add_url_rule(f"/api/{route}", route, api_queryable)

def get_remote_file(loc, transformer):
    loc = os.path.join(app.config.get("LOCALE"), loc).replace("\\", "/")
    directory = os.path.dirname(loc).replace("\\", "/")
    filename = os.path.basename(loc).replace("\\", "/")

    paths = [f for f in repository.get_contents(directory) if f.path == loc]

    cached = get_file_reference(loc)

    if len(paths) > 0:
        path = paths[0]
        if cached != None and cached[1] == path.sha:
            script = get_local_file(loc, "r+", lambda data: json.loads(data.read()))
        else:
            script = str(b64decode(repository.get_git_blob(path.sha).content), "utf-8") if path.size > 1000000 else str(path.decoded_content, "utf-8")

            script = transformer(script, key = filename.split(".")[0])
            set_file_reference(loc, path.sha)

            os.makedirs(os.path.join(".data", directory), exist_ok = True)
            get_local_file(loc, "w+", lambda data: data.write(json.dumps(script)))
        return script
    else:
        return None

def get_local_file(loc, mode, action):
    with open(os.path.join(".data", loc + ".json"), mode, encoding = "utf-8") as data:
        return action(data)

def get_file_reference(path):
    with sqlite3.connect(".data/storage.db") as db:
        return db.execute("SELECT * FROM files WHERE path = ?", (path,)).fetchone()

def set_file_reference(path, sha):
    with sqlite3.connect(".data/storage.db") as db:
        if get_file_reference(path) != None:
            db.execute("UPDATE files SET sha = ? WHERE path = ?", (sha, path))
        else:
            db.execute("INSERT INTO files VALUES (?, ?)", (path, sha))

def send_as_json(data, status_code = 200):
    return app.response_class(response = json.dumps(data), status = status_code, mimetype = "application/json")

def transform_shared_cfg(script, **kwargs):
    injected = lua.execute("json = require 'json'" + script + f" json.encode(pg.{kwargs['key']})")
    return { "entries": list(json.loads(injected).values()) }

def transform_game_cfg(script, **kwargs):
    injected = lua.execute("json = require 'json' " + script.replace("return", "return json.encode(") + ")")
    return json.loads(injected)

if __name__ == "__main__":
    app.run()
