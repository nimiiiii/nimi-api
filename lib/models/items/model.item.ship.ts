import Model from "../model.base";
import RequestError from "lib/requestError";
import ShareCfgModel from "../model.sharecfg.base";

@ShareCfgModel.dependsOn([ "ships", "shipGroups", "shipStats", "shipSkins" ])
export default class ShipItem extends ShareCfgModel {
    @Model.exclude()
    breakoutLevel: number;

    @Model.exclude()
    ship: any;

    @Model.exclude()
    stats: any;

    @Model.exclude()
    skin: any;

    @Model.exclude()
    group: any;

    id: number;
    groupId: number;
    name: string;
    rarity: number;
    assetName: string;

    constructor(groupId: number, breakoutLevel = 1) {
        super();

        if (breakoutLevel > 4 || breakoutLevel < 1)
            throw new RequestError(400, "Breakout level should only be between 1 and 4.");

        this.groupId = groupId;
    }

    async load(ships: any[], groups: any[], stats: any[], skins: any[]) {
        this.group = groups.find(g => g.group_type == this.groupId);

        if (!this.group)
            throw new RequestError(404, `Ship Group (ID: ${this.groupId}) not found.`);

        this.ship = ships.find(s => s.group_type == this.group.group_type);
        this.stats = stats.find(s => s.id == this.ship.id);
        this.skin = skins.find(s => s.id == this.stats.skin_id);

        this.id = this.ship.id;
        this.name = this.stats.name.trim();
        this.rarity = this.stats.rarity;
        this.assetName = this.skin.painting;
    }
}