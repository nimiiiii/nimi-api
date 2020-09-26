import Equipment from "./model.equip";
import ShareCfgModel from "../model.sharecfg.base";
import ShareCfgModelList from "../model.sharecfg.list.base";

@ShareCfgModel.dependsOn([ "equipStats" ])
export default class ItemList extends ShareCfgModelList<Equipment> {
    async load(items: any[]) {
        this.entries = items.map(i => new Equipment(i.id));
    }
}