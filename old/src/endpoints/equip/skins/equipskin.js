const Endpoint = require("../../../endpoint");
const SharedCfgRemote = require("../../../remote/sharecfgremote");
const EquipSkin = require("../../../models/equipskin");

class EquipSkinDetailEndpoint extends Endpoint {
    constructor() {
        super("/:skinId(\\d+)", SharedCfgRemote);
    }

    async action(req) {
        const { skinId } = req.params;

        return new EquipSkin(parseInt(skinId));
    }
}

module.exports = EquipSkinDetailEndpoint;