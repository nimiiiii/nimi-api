from flask import Flask, request, send_from_directory
from slpp import slpp as lua
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

os.makedirs(".data", exist_ok=True)

logging.basicConfig(filename=".data/log.txt", format="%(asctime)s [%(levelname)s] %(message)s", datefmt='%d-%b-%y %H:%M:%S', level=logging.INFO if not app.config.get("DEBUG") else logging.WARNING)
logging.info("Initializing app...")

with sqlite3.connect(".data/storage.db") as db:
    db.execute("CREATE TABLE IF NOT EXISTS files (path TEXT PRIKARY KEY, sha TEXT NOT NULL)")

logging.info("Established connection to database.")

github = Github(os.getenv("GITHUB_TOKEN"))
repository = github.get_repo(os.getenv("DATA_REPO"))

@app.route("/favicon.ico")
def favicon():
    return send_from_directory(os.path.join(app.root_path, "static"), "icon.ico", mimetype="image/x-icon")

for route, path in USING_FILE:
    def api_filterable(path=path):
        filters = request.args.to_dict()
        data = get_file(path)
        if len(filters) > 0:
            entries = data.values()
            filtered = [x for x in entries if all(k in x and str(x[k]).strip() == v for k, v in filters.items())]
            return send_as_json({ "entries": filtered })
        else:
            return send_as_json(data)

    app.add_url_rule(f"/api/{route}", route, api_filterable)

for route, path in USING_DIRECTORY:
    def api_queryiable(path=path):
        key = request.args.get("id", type=str)

        if key is None:
            return send_as_json({ "error": "Invalid key." })
        else:
            return send_as_json(get_file(f"{path}/{key}.lua", game_cfg_clean))

    app.add_url_rule(f"/api/{route}", route, api_queryiable)

def try_parse_int(s):
    try:
        parsed = int(s)
        return parsed
    except ValueError:
        return s

def shared_cfg_clean(decoded):
    return decoded.replace("return", "")[[i for i, l in enumerate(decoded) if l == "="][1] + 1:-1].strip()

def game_cfg_clean(decoded):
    return decoded.replace("return", "").strip()

def get_file(path, clean=shared_cfg_clean):
    path = f"{app.config.get('LOCALE')}/{path}"
    logging.info("Requesting file '%s'", path)
    directory = os.path.dirname(path)
    requested = [f for f in repository.get_contents(directory) if f.path == path][0]

    saved = get_file_reference(path)
    if saved != None and saved[1] == requested.sha:
        logging.info("Data is found in cache. Retrieving...")
        with open(f".data/{path}.json", "r+") as data:
            decoded = json.loads(data.read())
    else:
        logging.info("Data is outdated or not found. Fetching...")
        if requested.size > 1000000:
            logging.warning("Data exceeds 1 MB. Requesting a blob. This might take a while.")
            decoded = str(b64decode(repository.get_git_blob(requested.sha).content), "utf-8")
        else:
            decoded = str(requested.decoded_content, "utf-8")
        decoded = lua.decode(clean(decoded))
        
        set_file_reference(path, requested.sha)
        logging.info("Data has been updated. SHA: %s", requested.sha)

        os.makedirs(os.path.dirname(f".data/{path}"), exist_ok=True)
        with open(f".data/{path}.json", "w+") as data:
            data.write(json.dumps(decoded))

    return decoded

def send_as_json(data):
    return app.response_class(
        response = json.dumps(data),
        status = 200,
        mimetype = "application/json"
    )

def get_file_reference(path):
    with sqlite3.connect(".data/storage.db") as db:
        return db.execute("SELECT * FROM files WHERE path = ?", (path,)).fetchone()

def set_file_reference(path, sha):
    with sqlite3.connect(".data/storage.db") as db:
        if get_file_reference(path) != None:
            db.execute("UPDATE files SET sha = ? WHERE path = ?", (sha, path))
        else:
            db.execute("INSERT INTO files VALUES (?, ?)", (path, sha))

if __name__ == "__main__":
    app.run()