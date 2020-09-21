export default class ShipItemMixin {
    id: number;
    group: number;
    name: string;
    rarity: number;
    assetName: string;

    constructor({ ship, group, stats, skin}) {
        this.id = ship.id;
        this.group = group.group_type;
        this.name = stats.name.trim();
        this.rarity = stats.rarity - 1;
        this.assetName = skin.painting;
    }
}