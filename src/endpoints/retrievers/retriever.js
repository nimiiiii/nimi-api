const { readJSON, outputJSON, ensureDir } = require("fs-extra");
const { tableToObject } = require("../../util/json.lua.js");
const Enmap = require("enmap");
const path = require("path");

const resolvePath = (...p) => path.resolve(__dirname, ...p);

class Retriever {
    constructor(dir, repo) {
        this.dir = dir;
        this.lang = "en-US";
        this.repo = repo;
        this.remote = null;
        this.requests = [];
        this.references = null;
    }

    async init() {
        await ensureDir(resolvePath("../../.data"));

        this.references = new Enmap({ name: "file_references", dataDir: ".data", autoFetch: false });
        this.remote = await this.repo.getDirectory(path.join(this.lang, this.dir)
            .replace(/\\/, "/"));

        await this.references.defer;
    }

    add(key, file) {
        this.requests.push([key, file]);
    }

    async get() {
        if (this.references === null && this.remote === null)
            throw new Error("Unable to get requested resources. Did you forget to initialize?");

        const output = {};
        for (let [key, file] of this.requests) {
            let refLocal = this.references.get(path.join(this.lang, this.dir, file));
            let refRemote = this.remote.get(file).sha;
            let targetDir = resolvePath("../../.data/files", file.replace("lua", "json"));

            let obj;
            if (refLocal == refRemote)
                obj = await readJSON(targetDir);
            else {
                const script = await this.remote.download(file);
                obj = tableToObject(this.getLuaTable(script));
                await outputJSON(targetDir, obj);
                this.references.set(path.join(this.lang, this.dir, file), refRemote);
            }

            output[key] = this.mapObject(obj);
        }

        return output;
    }

    getLuaTable(script) {
        return script;
    }

    mapObject(obj) {
        return obj;
    }
}

module.exports = Retriever;