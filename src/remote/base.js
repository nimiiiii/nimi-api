const { readJSON, outputJSON, ensureDir, readdir, lstat } = require("fs-extra");
const Enmap = require("enmap");
const path = require("path");

class Remote {
    constructor(dir, lang, repo) {
        this.dir = dir;
        this.lang = lang;
        this.repo = repo;
        this.files = null;
        this.references = null;
    }

    async init() {
        console.log(`Initializing ${this.constructor.name}.`);

        await ensureDir(Remote.dataPath);

        this.files = await this.repo.getDirectory(path.join(this.lang, this.dir)
            .replace(/\\/g, "/"));

        this.references = new Enmap({
            name: "file_references",
            dataDir: Remote.dataPath,
            autoFetch: false
        });

        await this.references.defer;
    }

    async resolve() {
        return null;
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
            obj = JSON.parse(await this.files.download(file));
            await outputJSON(targetDir, obj);
            this.references.set(remotePath, refRemote);
            console.log(`Received update for ${remotePath}`);
        }

        return obj;
    }

    get initialized() {
        return this.files !== null || this.references !== null;
    }
}

Remote.dataPath = "./.data";
Remote.basePath = path.resolve(__dirname, "resolvers");

Remote.load = async function(repo, lang, dir = Remote.basePath) {
    let resolvers = [];
    let resolverModules = await readdir(dir);

    for (let artifact of resolverModules) {
        let stats = await lstat(`${dir}/${artifact}`);

        if (stats.isFile() && artifact.endsWith(".js")) {
            let file = require(path.resolve(`${dir}/${artifact}`));

            if (file && file.prototype instanceof Remote) {
                let resolver = new file(repo);

                if (lang.includes(resolver.lang)) {
                    await resolver.init();
                    resolvers.push(resolver);
                }
            }
        }
    }

    return resolvers;
};

module.exports = Remote;