const ShareCfgRemote = require("../sharecfgremote");

class CnShareCfgRemote extends ShareCfgRemote {
    constructor(repo) {
        super("zh-CN", repo);
    }
}

module.exports = CnShareCfgRemote;