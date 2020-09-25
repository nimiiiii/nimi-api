import Equipment from "./model.item.equip";
import Furniture from "./model.item.furniture";
import Item from "./model.item";
import Resource from "./model.item.resource";
import ShareCfgModel from "../model.sharecfg.base";
import ShipItem from "./model.item.ship";

enum DropType {
    Resource = 1,
    Item,
    Equipment,
    Ship,
    Furniture
}

export default class DropItem extends ShareCfgModel {
    type: DropType;
    item: Item | Resource | Furniture | ShipItem | Equipment;

    constructor(id: number, type: DropType) {
        super();

        this.type = type;

        switch (type) {
            case DropType.Resource:
                this.item = new Resource(id);
                break;

            case DropType.Item:
                this.item = new Item(id);
                break;

            case DropType.Equipment:
                this.item = new Equipment(id);
                break;

            case DropType.Ship:
                this.item = new ShipItem(id);
                break;

            case DropType.Furniture:
                this.item = new Furniture(id);
                break;
        }
    }
}