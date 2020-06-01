const { readdir } = require("fs-extra");
const Express = require("express");
const path = require("path");
const app = Express();

require("dotenv").config();

(async function() {
    const router = Express.Router();

    let endpoints = (await readdir("./src/endpoints")).filter(file => file.endsWith(".js"));

    for (let file of endpoints) {
        console.log();
        let mod = require(path.resolve(`./src/endpoints/${file}`));

        if (mod && mod.path && mod.func)
            router.get(mod.path, mod.func);
    }

    app.use("/api", router);
    app.listen((process.env.RELEASE_MODE == "development") ? 3000 : process.env.PORT,
        () => {
            console.log("Listen Server started.");
        });
})().catch(e => console.error(e));