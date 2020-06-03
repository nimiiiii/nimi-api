const ErrorHandler = require("./util/errorhandler");
const { readdir, lstat } = require("fs-extra");
const Model = require("./models/base");
const Express = require("express");
const path = require("path");

class Endpoint {
    constructor(path, retriever) {
        this.path = path;
        this.retriever = retriever;
    }

    add(key, file) {
        if (this.retriever === null)
            throw new Error("Cannot use this method while retriever root is null");

        this.retriever.add(key, file);
    }

    async get() {
        if (this.retriever === null)
            throw new Error("Cannot use this method while retriever root is null");

        return await this.retriever.get();
    }

    async method(req, res, next) {
        try {
            if (this.retriever !== null)  {
                this.retriever.lang = req.query.region;
                await this.retriever.init();
            }

            const output = await this.action(req, res, next);

            if (typeof output == "object")
                res.jsonp(output);
            else if (output.prototype instanceof Model)
                res.jsonp(output.serialize());
            else
                res.jsonp({ error: "Invalid Model" });
        } catch (error) {
            next(new ErrorHandler(error.status || 500, "An error has occured", error));
        }
    }

    async action(req, res) {
        res.statusCode(204);
        return { message: "Endpoint is incomplete" };
    }
}

Endpoint.load = async function(dir, router, repo) {
    let endpoints = await readdir(dir);

    for (let artifact of endpoints) {
        let stats = await lstat(`${dir}/${artifact}`);

        if (stats.isFile() && artifact.endsWith(".js")) {
            let file = require(path.resolve(`${dir}/${artifact}`));

            if (file && file.prototype instanceof Endpoint) {
                let endpoint = new file(repo);
                router.get(endpoint.path, endpoint.method.bind(endpoint));
            }
        }

        if (stats.isDirectory()) {
            let sub = Express.Router({ mergeParams: true });
            router.use(`/${artifact}`, sub);

            await Endpoint.load(`${dir}/${artifact}`, sub, repo);
        }
    }
};

module.exports = Endpoint;