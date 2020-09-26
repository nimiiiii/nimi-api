import Furniture from "./model.item.furniture";
import ShareCfgModel from "../model.sharecfg.base";
import ShareCfgModelList from "../model.sharecfg.list.base";

@ShareCfgModel.dependsOn([ "furniture" ])
export default class FurnitureList extends ShareCfgModelList<Furniture> {
    async load(items: any[]) {
        this.entries = items.map(i => new Furniture(i.id));
    }
}