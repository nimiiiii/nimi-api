const Model = require("./base");
const { SHIP_SKIN_TYPE } = require("../util/constants");

class ShipSkinItem extends Model {
    constructor(data) {
        super();

        this.id = data.skin_id;
        this.name = data.name;
        this.description = data.desc;
        this.assetName = data.painting;
        this.type = SHIP_SKIN_TYPE[data.skin_type];
    }
}

module.exports = ShipSkinItem;