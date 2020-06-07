const Endpoint = require("../../endpoint");
const SharedCfgRemote = require("../../remote/sharecfgremote");
const Equip = require("../../models/equip");

class EquipDetailEndpoint extends Endpoint {
    constructor() {
        super("/:equipId(\\d+)", SharedCfgRemote);
    }

    async action(req) {
        const { equipId } = req.params;

        return new Equip(parseInt(equipId));
    }
}

module.exports = EquipDetailEndpoint;