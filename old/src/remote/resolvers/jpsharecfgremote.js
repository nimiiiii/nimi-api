const ShareCfgRemote = require("../sharecfgremote");

class JpShareCfgRemote extends ShareCfgRemote {
    constructor(repo) {
        super("JP", repo);
    }
}

module.exports = JpShareCfgRemote;