const ShareCfgRemote = require("../sharecfgremote");

class JpShareCfgRemote extends ShareCfgRemote {
    constructor(repo) {
        super("ja-JP", repo);
    }
}

module.exports = JpShareCfgRemote;