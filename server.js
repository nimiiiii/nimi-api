const { readdir, lstat } = require("fs-extra");
const { REGIONS } = require("./src/util/constants");
const Express = require("express");
const chalk = require("chalk");
const path = require("path");

const app = Express();

require("dotenv").config();

(async function() {
    const base = Express.Router();

    app.use(function(req, res, next) {
        req.query.region = REGIONS[req.query.region] || "en-US";
        next();
    });

    app.use(function(req, res, next) {
        const statusColorMap = {
            "2": chalk.green,
            "3": chalk.green,
            "4": chalk.yellow,
            "5": chalk.red
        };
        res.on("finish", function() {
            const { statusCode } = this;
            const statusColor = statusColorMap[statusCode.toString()[0]];
            console.log(`${statusColor(statusCode)} ${chalk.bold(req.method)} ${req.originalUrl}`);
        });
        next();
    });

    await loadEndpoints("./src/endpoints", base);

    app.use("/api", base);

    // eslint-disable-next-line no-unused-vars
    app.use(function(req, res, next) {
        res.status(404).jsonp({ message: "Not Found" });
    });

    // eslint-disable-next-line no-unused-vars
    app.use(function(err, req, res, next) {
        res.status(err.status || 500).jsonp({ message: "Internal Server Error" });
    });

    const port = process.env.PORT;
    app.listen(port, function() {
        console.clear();
        console.log(`${chalk.bgBlueBright(" START ")} Server is now listening on port ${port}`);
    });
})().catch(e => console.error(e));

async function loadEndpoints(dir, router) {
    let endpoints = await readdir(dir);

    for (let artifact of endpoints) {
        let stats = await lstat(`${dir}/${artifact}`);

        if (stats.isFile() && artifact.endsWith(".js")) {
            let mod = require(path.resolve(`${dir}/${artifact}`));

            if (mod && mod.path && mod.func)
                router.get(mod.path, mod.func);
        }

        if (stats.isDirectory()) {
            let sub = Express.Router({ mergeParams: true });
            router.use(`/${artifact}`, sub);

            await loadEndpoints(`${dir}/${artifact}`, sub);
        }
    }
}