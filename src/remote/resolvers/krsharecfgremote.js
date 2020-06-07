const ShareCfgRemote = require("../sharecfgremote");

class KrShareCfgRemote extends ShareCfgRemote {
    constructor(repo) {
        super("ko-KR", repo);
    }
}

module.exports = KrShareCfgRemote;