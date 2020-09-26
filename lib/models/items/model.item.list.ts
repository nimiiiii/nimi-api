import Item from "./model.item";
import ShareCfgModel from "../model.sharecfg.base";
import ShareCfgModelList from "../model.sharecfg.list.base";

@ShareCfgModel.dependsOn([ "items" ])
export default class ItemList extends ShareCfgModelList<Item> {
    constructor() {
        super(Item);
    }
}