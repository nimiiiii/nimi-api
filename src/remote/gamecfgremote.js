const Remote = require("./base");

class GameCfgRemote extends Remote {
    constructor(dir, lang, repo) {
        super(dir, lang, repo);
    }

    async resolve() {
        return [this];
    }
}

module.exports = GameCfgRemote;