const Retriever = require("./retriever");

class ShareCfgRetriever extends Retriever {
    constructor(repo) {
        super("/sharecfg", repo);
    }

    getLuaTable(script) {
        return script.substr(
            script.indexOf("= {") + 2,
            script.lastIndexOf("}")
        );
    }

    mapObject(obj) {
        if (obj.all)
            delete obj.all;

        return Object.values(obj);
    }
}

module.exports = ShareCfgRetriever;