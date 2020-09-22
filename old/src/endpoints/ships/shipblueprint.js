const Endpoint = require("../../endpoint");
const SharedCfgRemote = require("../../remote/sharecfgremote");
const ShipBlueprint = require("../../models/shipblueprint");

class ShipBlueprintEndpoint extends Endpoint {
    constructor() {
        super("/:groupId(\\d+)/blueprint", SharedCfgRemote);
    }

    async action(req) {
        const { groupId } = req.params;

        return new ShipBlueprint(parseInt(groupId));
    }
}

module.exports = ShipBlueprintEndpoint;