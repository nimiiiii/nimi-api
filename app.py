from flask import Flask, request, send_from_directory
from lupa import LuaRuntime
from github import Github
from dotenv import load_dotenv
from base64 import b64decode
from app_config import ROUTES, LOCALE
import sqlite3
import json
import os

load_dotenv()

app = Flask(__name__)
app.config["DEBUG"] = os.getenv("RELEASE_MODE", "production") != "production"

lua = LuaRuntime(unpack_returned_tuples = True)
os.makedirs(".data", exist_ok=True)

with sqlite3.connect(".data/storage.db") as db:
    db.execute("CREATE TABLE IF NOT EXISTS files (path TEXT PRIMARY KEY, sha TEXT NOT NULL)")

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

for route, path in ROUTES["USING_FILE"]:
    def api_filterable(path = path):
        filters = request.args.to_dict()
        filters.pop('region', None)
        filters.pop('keys', None)

        data = get_remote_file(path, transform_shared_cfg, request.args.get("region", type=str, default="en"))
        if data is None:
            return send_as_json({ "error": "Not Found" }, 404)
        else:
            data = data["entries"]

        if len(filters) > 0:
            data = [e for e in data if all(k in e and str(e[k]).strip().lower() in v.lower().split(",") for k, v in filters.items())]

        keys = request.args.get("keys", type=str, default="").split(",")
        if len(keys) > 0 and len(data) > 0:
            to_remove = set(data[0].keys()).difference(keys)
            for entry in data:
                for key in to_remove:
                    if key in entry:
                        del entry[key]

        return send_as_json({ "entries": data })

    app.add_url_rule(f"/api/{route}", route, api_filterable)

for route, path in ROUTES["USING_DIRECTORY"]:
    def api_queryable(path = path):
        key = request.args.get("id", type=str)

        return send_as_json(get_remote_file(os.path.join(path, key.lower() + ".lua"), transform_game_cfg, \
            request.args.get("region", type=str, default="en"))) \
            if key != None else send_as_json({ "error": "Not Found" }, 404)

    app.add_url_rule(f"/api/{route}", route, api_queryable)

def get_remote_file(location, transformer, locale = "en"):
    if locale not in LOCALE:
        return None

    location = os.path.join(LOCALE[locale], location).replace("\\", "/")
    directory = os.path.dirname(location).replace("\\", "/")
    filename = os.path.basename(location).replace("\\", "/")

    paths = [f for f in repository.get_contents(directory) if f.path == location]

    cached = get_file_reference(location)

    if len(paths) > 0:
        path = paths[0]
        if cached != None and cached[1] == path.sha:
            script = get_local_file(location, "r+", lambda data: json.loads(data.read()))
        else:
            script = str(b64decode(repository.get_git_blob(path.sha).content), "utf-8") \
                if path.size > 1000000 else str(path.decoded_content, "utf-8")

            script = transformer(script, key = filename.split(".")[0])
            set_file_reference(location, path.sha)

            os.makedirs(os.path.join(".data", directory), exist_ok = True)
            get_local_file(location, "w+", lambda data: data.write(json.dumps(script)))
        return script
    else:
        return None

def get_local_file(location, mode, action):
    with open(os.path.join(".data", location + ".json"), mode, encoding = "utf-8") as data:
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
    return json.loads(injected).values()

def transform_game_cfg(script, **kwargs):
    injected = lua.execute("json = require 'json' " + script.replace("return", "return json.encode(") + ")")
    return json.loads(injected)

if __name__ == "__main__":
    app.run()