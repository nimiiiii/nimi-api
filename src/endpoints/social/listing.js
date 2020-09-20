const Endpoint = require("../../endpoint");
const SharedCfgRemote = require("../../remote/sharecfgremote");
const SocialList = require("../../models/sociallist");

class SocialListingEndpoint extends Endpoint {
    constructor() {
        super("/", SharedCfgRemote);
    }

    async action() {
        return new SocialList();
    }
}

module.exports = SocialListingEndpoint;