const Endpoint = require("../../../endpoint");
const SharedCfgRemote = require("../../../remote/sharecfgremote");
const Resource = require("../../../models/resource");

class ResourceDetailEndpoint extends Endpoint {
    constructor() {
        super("/:resId(\\d+)", SharedCfgRemote);
    }

    async action(req) {
        const { resId } = req.params;

        return new Resource(parseInt(resId));
    }
}

module.exports = ResourceDetailEndpoint;