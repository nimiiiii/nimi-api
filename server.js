const { REGIONS } = require("./src/util/constants");
const Repository = require("./src/github/repository");
const Endpoint = require("./src/endpoint");
const Remote = require("./src/remote/base");
const favicon = require("serve-favicon");
const Express = require("express");
const chalk = require("chalk");
const path = require("path");

const app = Express();

require("dotenv").config();

const oldConsoleLog = console.log;
console.log = function() {
    let args = Array.from(arguments);
    let timestamp = Intl.DateTimeFormat("en-us", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true
    }).format(new Date());

    args.unshift(`[${timestamp}]`);
    oldConsoleLog.apply(console, args);
};

(async function() {
    console.clear();

    const base = Express.Router();

    const repo = new Repository(process.env.GITHUB_TOKEN, process.env.DATA_REPO, "master");
    const debug = process.env.ENVIRONMENT == "development";
    app.set("resolvers", await Remote.load("./src/remote/resolvers", repo, debug));

    app.use(favicon(path.join(__dirname, "static", "icon.ico")));

    app.use(function(req, _, next) {
        req.query.region = REGIONS[req.query.region] || "en-US";
        next();
    });

    app.use(function(req, res, next) {
        const start = process.hrtime();
        const statusColorMap = {
            "2": chalk.green,
            "3": chalk.green,
            "4": chalk.yellow,
            "5": chalk.red
        };
        const getDurationInMillis = (start) => {
            const NS_PER_SEC = 1e9;
            const NS_TO_MS = 1e6;
            const diff = process.hrtime(start);

            return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
        };

        res.on("finish", function() {
            const { statusCode } = this;
            const statusColor = statusColorMap[statusCode.toString()[0]];
            console.log([
                statusColor(statusCode),
                chalk.bold(req.method),
                `(${getDurationInMillis(start).toLocaleString()} ms)`,
                req.originalUrl
            ].join(" "));
        });

        next();
    });

    await Endpoint.load("./src/endpoints", base);

    app.use("/api", base);

    // eslint-disable-next-line no-unused-vars
    app.use(function(req, res, next) {
        res.status(404).jsonp({ message: "Not Found" });
    });

    // eslint-disable-next-line no-unused-vars
    app.use(function(err, req, res, next) {
        if (err.status === 500)
            console.error(err.stack);
        const message = (err.source) ? err.source.message : "Internal Server Error";
        res.status(err.status).jsonp({ message });
    });

    const port = process.env.PORT;
    app.listen(port, function() {
        console.log(`${chalk.bgBlueBright(" START ")} Server is now listening on port ${port}`);
    });
})().catch(e => console.error(e));