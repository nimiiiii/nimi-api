const ShareCfgRemote = require("../sharecfgremote");

class EnShareCfgRemote extends ShareCfgRemote {
    constructor(repo) {
        super("EN", repo);
    }
}

module.exports = EnShareCfgRemote;