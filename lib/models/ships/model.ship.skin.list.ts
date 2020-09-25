import Model from "../model.base";
import RequestError from "lib/requestError";
import ShareCfgModel from "../model.sharecfg.base";
import ShareCfgModelList from "../model.sharecfg.list.base";
import ShipSkinListItem from "./model.ship.skin.list.item";

@ShareCfgModel.dependsOn([ "shipSkins" ])
export default class ShipSkinList extends ShareCfgModelList<ShipSkinListItem> {
    @Model.exclude()
    groupId: number;

    constructor(groupId: number) {
        super();

        this.groupId = groupId;
    }

    async load(skins: any[]) {
        const entries = skins.filter(s => s.ship_group == this.groupId);

        if (entries.length < 1)
            throw new RequestError(404, `Ship (Group ID: ${this.groupId}) has no skins.`);

        this.entries = entries.map(s => new ShipSkinListItem(s.id));
    }
}