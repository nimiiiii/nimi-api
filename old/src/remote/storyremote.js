const GameCfgRemote = require("./gamecfgremote");

class StoryRemote extends GameCfgRemote {
    constructor(lang, repo) {
        super("/story", lang, repo);
    }
}

module.exports = StoryRemote;