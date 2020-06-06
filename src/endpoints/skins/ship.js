const Endpoint = require("../../endpoint");
const SharedCfgRemote = require("../../remote/sharecfgremote");
const ShipSkin = require("../../models/shipskin");

class ShipSkinDetailEndpoint extends Endpoint {
    constructor() {
        super("/ship/:skinId", SharedCfgRemote);
    }

    async action(req) {
        const { skinId } = req.params;

        return new ShipSkin(parseInt(skinId));
    }
}

module.exports = ShipSkinDetailEndpoint;