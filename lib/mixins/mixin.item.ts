export default class ItemMixin {
    id: number;
    name: string;
    rarity: number;
    assetName: string;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.rarity = data.rarity;
        this.assetName = data.icon;
    }
}