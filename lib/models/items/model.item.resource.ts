import Item from "./model.item";
import RequestError from "lib/requestError";
import ShareCfgModel from "../model.sharecfg.base";

@ShareCfgModel.dependsOn([ "resources" ])
export default class Resource extends ShareCfgModel {
    id: number;
    name: string;
    item: Item;

    constructor(id: number) {
        super();

        this.id = id;
    }

    async load(resources: any[]) {
        const data = resources.find(r => r.id == this.id);

        if (!data)
            throw new RequestError(404, `Resource (ID: ${this.id}) is not found.`);

        this.name = data.name;
        this.item = new Item(data.itemId);
    }
}