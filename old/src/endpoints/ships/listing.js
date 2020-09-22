const Endpoint = require("../../endpoint");
const SharedCfgRemote = require("../../remote/sharecfgremote");
const ShipList = require("../../models/shiplist");

class ShipListingEndpoint extends Endpoint {
    constructor() {
        super("/", SharedCfgRemote);
    }

    async action() {
        return new ShipList();
    }
}

module.exports = ShipListingEndpoint;