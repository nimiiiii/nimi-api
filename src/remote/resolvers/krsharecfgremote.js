const ShareCfgRemote = require("../sharecfgremote");

class KrShareCfgRemote extends ShareCfgRemote {
    constructor(repo) {
        super("KR", repo);
    }
}

module.exports = KrShareCfgRemote;