class FurnitureMixin {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.describe;

        // TODO: Disambiguate furniture types
        this.type = data.type;
        this.rarity = data.rarity;
        this.assetName = data.icon;
    }
}

module.exports = FurnitureMixin;