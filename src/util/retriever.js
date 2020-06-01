const { Octokit } = require("@octokit/rest");
const { readJSON, outputJSON, mkdir, ensureDir } = require("fs-extra");
const { tableToObject } = require("./json.lua.js");
const Enmap = require("enmap");
const path = require("path");

const resolvePath = (...p) => path.resolve(__dirname, ...p);

class Retriever {
    constructor(options = {}) {
        Object.defineProperty(this, "options", {
            value: { ...Retriever.defaults, ...options },
            writeable: false
        });

        Object.defineProperty(this, "github", {
            value: new Octokit({ auth: options.key }),
            writeable: false
        });

        Object.defineProperty(this, "files", {
            value: [],
            writable: false,
        });

        Object.defineProperty(this, "references", {
            value: null,
            writable: true
        });
    }

    async init() {
        try {
            await ensureDir(resolvePath("../../", this.options.dataDir));
        } catch (err) {
            await mkdir(resolvePath("../../", this.options.dataDir));
        }

        this.references = new Enmap({
            name: "file_references",
            dataDir: this.options.dataDir,
            autoFetch: false,
        });

        await this.references.defer;
    }

    add(key, path, preParseFunc = Retriever.defaults.stripFunc, postParseFunc = Retriever.defaults.parseFunc) {
        this.files.push([key, path, preParseFunc, postParseFunc]);
    }

    async get() {
        const output = {};

        for(let [key, path, preParseFunc, postParseFunc] of this.files) {
            let targetDir = resolvePath(
                "../../",
                this.options.dataDir,
                "files",
                (path.startsWith("/"))
                    ? path.substr(1).replace("lua", "json")
                    : path.replace("lua", "json")
            );

            const [ script, remote ] = await this.getRemoteFile(path);

            let obj;
            if (script) {
                this.references.set(path, remote.data.sha);

                let parsed = (preParseFunc)
                    ? preParseFunc(script)
                    : script;

                obj = tableToObject(parsed);
                await outputJSON(targetDir, obj);
            } else
                obj = await readJSON(targetDir);

            if (postParseFunc)
                obj = postParseFunc(obj);

            output[key] = obj;
        }

        return output;
    }

    async getRemoteFile(path) {
        let remote = await this.github.repos.getContents({ owner: this.options.github.owner, repo: this.options.github.repo, path });
        let reference = this.references.get(path);

        let out;
        if (reference !== remote.data.sha) {
            let blob;
            if (remote.data.size > 1000000)
                blob = await this.github.git.getBlob({ owner: this.options.github.owner, repo: this.options.github.repo, sha: remote.data.sha });

            out = (blob)
                ? Buffer.from(blob.data.content, blob.data.encoding).toString("utf-8")
                : Buffer.from(remote.data.content, remote.data.encoding).toString("utf-8");
        }

        return [ out, remote ];
    }
}

const route = (process.env.DATA_REPO) ? process.env.DATA_REPO.split("/") : [];

Retriever.defaults = {
    dataDir: "./.data",
    github: {
        key: process.env.GITHUB_TOKEN || "",
        repo: route[1] || "",
        owner: route[0] || ""
    },
    stripFunc: function(script) {
        return script.substr(
            script.indexOf("= {") + 2,
            script.lastIndexOf("}")
        );
    },
    parseFunc: function(obj) {
        if (obj.all)
            delete obj.all;

        return Object.values(obj);
    }
};

module.exports = Retriever;