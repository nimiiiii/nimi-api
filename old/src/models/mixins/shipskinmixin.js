class ShipSkinMixin {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.desc;
        this.assetName = data.painting;
        this.type = data.skin_type;
    }
}

module.exports = ShipSkinMixin;