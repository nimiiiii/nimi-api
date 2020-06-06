const { SHIP_SKIN_TYPE } = require("../../util/constants");

class ShipSkinMixin {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.desc;
        this.assetName = data.painting;
        this.type = SHIP_SKIN_TYPE[data.skin_type];
    }
}

module.exports = ShipSkinMixin;