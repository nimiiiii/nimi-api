import ModelList from "../model.list.base";
import ShipListItem from "./model.ship.list.item";

export default class ShipList extends ModelList {
    async load(shipGroups: any[]): Promise<void> {
        this.entries = shipGroups.map(g => new ShipListItem(g.group_type));
    }
}