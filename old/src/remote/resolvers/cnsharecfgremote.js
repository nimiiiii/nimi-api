const ShareCfgRemote = require("../sharecfgremote");

class CnShareCfgRemote extends ShareCfgRemote {
    constructor(repo) {
        super("CN", repo);
    }
}

module.exports = CnShareCfgRemote;