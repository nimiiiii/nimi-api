const ShareCfgRemote = require("../sharecfgremote");

class TwShareCfgRemote extends ShareCfgRemote {
    constructor(repo) {
        super("zh-TW", repo);
    }
}

module.exports = TwShareCfgRemote;