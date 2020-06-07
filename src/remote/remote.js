const { readJSON, outputJSON, ensureDir } = require("fs-extra");
const { tableToObject } = require("../util/json.lua.js");
const Enmap = require("enmap");
const path = require("path");
const util = require("util");

const sleep = util.promisify(setTimeout);

class Remote {
    constructor(dir, repo) {
        this.dir = dir;
        this.lang = "en-US";
        this.repo = repo;
        this.files = null;
        this.references = null;

        this.dependencies = {};
    }

    async init() {
        console.log(`Initializing ${this.constructor.name}.`);

        await ensureDir(Remote.dataPath);

        this.references = new Enmap({
            name: "file_references",
            dataDir: Remote.dataPath,
            autoFetch: false
        });
        this.files = await this.repo.getDirectory(path.join(this.lang, this.dir)
            .replace(/\\/g, "/"));

        for (let file of Object.values(this.dependencies)) {
            await this.get(file);
        }

        await this.references.defer;
    }

    add(key, file) {
        this.dependencies[key] = file;
    }

    async resolve(key) {
        const file = this.dependencies[key];

        if (file === undefined)
            throw new Error(`Cannot resolve dependency > ${this.constructor.name}:${key}`);

        return await this.get(file);
    }

    async get(file) {
        if (!this.initialized)
            throw new Error("Remote has not been initialized.");

        let remotePath = path.join(this.lang, this.dir, file).replace(/\\/g, "/");

        if (this.files.get(file) === undefined)
            throw new Error(`${remotePath} is not a file or is not found.`);

        let refLocal = this.references.get(remotePath);
        let refRemote = this.files.get(file).sha;
        let targetDir = path.join(Remote.dataPath,
            "/files", this.lang, file.replace("lua", "json"));

        let obj;
        if (refLocal == refRemote)
            obj = await readJSON(targetDir);
        else {
            const script = await this.files.download(file);

            // tableToObject is very expensive to run concurrently
            // so we add a delay to let garbage collection do its thing
            const mem = process.memoryUsage().heapUsed / 1024 / 1024;
            if (mem > 512 * 0.75) await sleep(1000);

            obj = tableToObject(this.getLuaTable(script));

            await outputJSON(targetDir, obj);
            this.references.set(remotePath, refRemote);
            console.log(`Received update for ${remotePath}`);
        }

        return this.getMappedObject(obj);
    }

    getLuaTable(script) {
        return script;
    }

    getMappedObject(obj) {
        return obj;
    }

    get initialized() {
        return this.files !== null || this.references !== null;
    }
}

Remote.dataPath = "./.data";

module.exports = Remote;