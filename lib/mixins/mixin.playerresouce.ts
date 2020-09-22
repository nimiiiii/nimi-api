import ItemMixin from "./mixin.item";

export default class PlayerResourceMixin {
    id: number;
    name: string;
    item?: ItemMixin;

    constructor(data: any, items: any) {
        this.id = data.id;
        this.name = data.name;

        let item = items.find((i: any) => i.id == data.itemid);
        this.item = (item) ? new ItemMixin(item) : null;
    }

}