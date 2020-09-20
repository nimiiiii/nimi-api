const ShareCfgRemote = require("../sharecfgremote");

class TwShareCfgRemote extends ShareCfgRemote {
    constructor(repo) {
        super("TW", repo);
    }
}

module.exports = TwShareCfgRemote;