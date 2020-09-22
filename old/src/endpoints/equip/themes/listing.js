const Endpoint = require("../../../endpoint");
const SharedCfgRemote = require("../../../remote/sharecfgremote");
const EquipSkinThemeList = require("../../../models/equipskinthemelist");

class EquipSkinThemeListingEndpoint extends Endpoint {
    constructor() {
        super("/", SharedCfgRemote);
    }

    async action() {
        return new EquipSkinThemeList();
    }
}

module.exports = EquipSkinThemeListingEndpoint;