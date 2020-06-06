class ShipItemMixin {
    constructor({ ship, group, stats, skin }) {
        this.id = ship.id;
        this.group = group.group_type;
        this.name = stats.name;
        this.rarity = stats.rarity - 1;
        this.assetName = skin.painting;
    }
}

module.exports = ShipItemMixin;