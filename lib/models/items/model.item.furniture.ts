import Item from "./model.item";
import RequestError from "lib/requestError";
import ShareCfgModel from "../model.sharecfg.base";

@ShareCfgModel.dependsOn([ "items", "furniture" ])
export default class Furniture extends Item {
    type: number;
    description: string;

    constructor(id: number) {
        super(id);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async load(items: any[], furniture: any[]) {
        await super.load(items);

        const data = furniture.find(f => f.id == this.id);

        if (!data)
            throw new RequestError(404, `Furniture (ID: ${this.id}) is not found.`);

        this.type = data.type;
        this.description = data.describe;
    }
}