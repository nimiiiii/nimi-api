import ShareCfgModel from "../model.sharecfg.base";
import ShareCfgModelList from "../model.sharecfg.list.base";
import ShipListItem from "./model.ship.list.item";

@ShareCfgModel.dependsOn([ "shipGroups" ])
export default class ShipList extends ShareCfgModelList {
    async load(groups: any[]): Promise<void> {
        this.entries = groups.map(g => new ShipListItem(g.group_type));
    }
}