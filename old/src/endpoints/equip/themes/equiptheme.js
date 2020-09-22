const Endpoint = require("../../../endpoint");
const SharedCfgRemote = require("../../../remote/sharecfgremote");
const EquipSkinTheme = require("../../../models/equipskintheme");

class EquipSkinDetailEndpoint extends Endpoint {
    constructor() {
        super("/:themeId", SharedCfgRemote);
    }

    async action(req) {
        const { themeId } = req.params;

        return new EquipSkinTheme(parseInt(themeId));
    }
}

module.exports = EquipSkinDetailEndpoint;