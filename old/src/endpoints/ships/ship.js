const Endpoint = require("../../endpoint");
const SharedCfgRemote = require("../../remote/sharecfgremote");
const Ship = require("../../models/ship");

class ShipDetailEndpoint extends Endpoint {
    constructor() {
        super("/:groupId(\\d+)", SharedCfgRemote);
    }

    async action(req) {
        const { groupId } = req.params;
        const { breakout } = req.query;

        return new Ship(parseInt(groupId), parseInt(breakout));
    }
}

module.exports = ShipDetailEndpoint;