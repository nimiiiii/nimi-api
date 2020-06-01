const { readdir, lstat } = require("fs-extra");
const Express = require("express");
const path = require("path");
const app = Express();

require("dotenv").config();

(async function() {
    const base = Express.Router();

    await loadEndpoints("./src/endpoints", base);

    app.use("/api", base);
    app.listen((process.env.RELEASE_MODE == "development") ? 3000 : process.env.PORT,
        () => {
            console.log("Listen Server started.");
        });
})().catch(e => console.error(e));

async function loadEndpoints(dir, router) {
    let endpoints = await readdir(dir, );

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