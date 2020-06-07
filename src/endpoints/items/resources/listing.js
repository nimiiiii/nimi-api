const Endpoint = require("../../../endpoint");
const SharedCfgRemote = require("../../../remote/sharecfgremote");
const ResourceList = require("../../../models/resourcelist");

class ResourceListingEndpoint extends Endpoint {
    constructor() {
        super("/", SharedCfgRemote);
    }

    async action() {
        return new ResourceList();
    }
}

module.exports = ResourceListingEndpoint;