const ShareCfgRemote = require("../sharecfgremote");

class EnShareCfgRemote extends ShareCfgRemote {
    constructor(repo) {
        super("en-US", repo);
    }
}

module.exports = EnShareCfgRemote;