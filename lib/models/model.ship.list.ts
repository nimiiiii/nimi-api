import List from "./model.list";
import ShipListItem from "./model.ship.list.item";

export default class ShipList extends List {
    async load(shipGroups: any[]): Promise<void> {
        this.entries = shipGroups.map(g => new ShipListItem(g.group_type));
    }
}