import Resource from "./model.item.resource";
import ShareCfgModel from "../model.sharecfg.base";
import ShareCfgModelList from "../model.sharecfg.list.base";

@ShareCfgModel.dependsOn([ "resources" ])
export default class ResourceList extends ShareCfgModelList<Resource> {
    async load(items: any[]) {
        this.entries = items.map(i => new Resource(i.id));
    }
}