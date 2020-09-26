import Item from "./model.item";
import ShareCfgModel from "../model.sharecfg.base";
import ShareCfgModelList from "../model.sharecfg.list.base";

@ShareCfgModel.dependsOn([ "items" ])
export default class ItemList extends ShareCfgModelList<Item> {
    async load(items: any[]) {
        this.entries = items.map(i => new Item(i.id));
    }
}