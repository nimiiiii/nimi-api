const Endpoint = require("../../endpoint");
const SharedCfgRemote = require("../../remote/sharecfgremote");
const Social = require("../../models/social");

class SocialDetailEndpoint extends Endpoint {
    constructor() {
        super("/:postId(\\d+)", SharedCfgRemote);
    }

    async action(req) {
        const { postId } = req.params;

        return new Social(parseInt(postId));
    }
}

module.exports = SocialDetailEndpoint;