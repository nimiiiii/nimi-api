import Item from "./model.item";
import ShareCfgModelList from "../model.sharecfg.list.base";
import { dependsOn } from "../model.helpers";

@dependsOn([ "items" ])
export default class ItemList extends ShareCfgModelList<Item> {
    constructor() {
        super(Item);
    }
}