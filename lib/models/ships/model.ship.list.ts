import ShareCfgModelList from "../model.sharecfg.list.base";
import ShipListItem from "./model.ship.list.item";

export default class ShipList extends ShareCfgModelList {
    constructor() {
        super([ "shipGroups" ]);
    }

    async load(groups: any[]): Promise<void> {
        this.entries = groups.map(g => new ShipListItem(g.group_type));
    }
}