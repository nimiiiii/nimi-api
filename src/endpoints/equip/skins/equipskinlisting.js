const Endpoint = require("../../../endpoint");
const SharedCfgRemote = require("../../../remote/sharecfgremote");
const EquipSkinList = require("../../../models/equipskinlist");

class EquipSkinListingEndpoint extends Endpoint {
    constructor() {
        super("/", SharedCfgRemote);
    }

    async action() {
        return new EquipSkinList();
    }
}

module.exports = EquipSkinListingEndpoint;