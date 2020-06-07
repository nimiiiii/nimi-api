class ItemMixin {
    constructor(data) {
        this.id = data.id;
        this.name = data.name.trim();
        this.rarity = data.rarity;
        this.assetName = data.icon;
    }
}

module.exports = ItemMixin;