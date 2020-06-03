const { REGIONS } = require("./src/util/constants");
const Repository = require("./src/github/repository");
const Endpoint = require("./src/endpoint");
const Express = require("express");
const chalk = require("chalk");

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

    await Endpoint.load("./src/endpoints", base, 
        new Repository(process.env.GITHUB_TOKEN, process.env.DATA_REPO, "master"));

    app.use("/api", base);

    // eslint-disable-next-line no-unused-vars
    app.use(function(req, res, next) {
        res.status(404).jsonp({ message: "Not Found" });
    });

    // eslint-disable-next-line no-unused-vars
    app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.status(err.status).jsonp({ message: "Internal Server Error" });
    });

    const port = process.env.PORT;
    app.listen(port, function() {
        console.clear();
        console.log(`${chalk.bgBlueBright(" START ")} Server is now listening on port ${port}`);
    });
})().catch(e => console.error(e));