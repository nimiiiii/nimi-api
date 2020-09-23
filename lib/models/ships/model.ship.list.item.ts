import Model from "../model.base";
import RequestError from "lib/requestError";
import ShareCfgModel from "../model.sharecfg.base";

export default class ShipListItem extends ShareCfgModel {
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
    name: string;
    code: number;
    type: number;
    rarity: number;
    nation: string;
    groupId: number;
    assetName: string;
    isResearch: boolean;
    hasRetrofit: boolean;

    constructor(groupId: number, breakoutLevel = 1) {
        super();

        if (breakoutLevel > 4 || breakoutLevel < 1)
            throw new RequestError(400, "Breakout level should only be between 1 and 4.");

        this.groupId = groupId;
        this.breakoutLevel = breakoutLevel;
    }

    async load(
        ships : any[],
        shipGroups : any[],
        shipStats : any[],
        shipSkins : any[],
        shipRetrofits : any[],
        shipBlueprints : any[]
    ): Promise<void> {
        this.group = shipGroups.find(g => g.group_type == this.group);

        if (!this.group)
            throw new RequestError(404, "Ship Group not found.");

        this.ship = ships.filter(s => s.group_type == this.group.group_type)[this.breakoutLevel - 1];
        this.stats = shipStats.find(s => s.id == this.ship.id);
        this.skin = shipSkins.find(s => s.id == this.stats.skin_id);

        this.id = this.ship.id;
        this.name = this.stats.name.trim();
        this.code = this.group.code;
        this.type = this.stats.type;
        this.groupId = this.group.group_type;
        this.rarity = this.stats.rarity;
        this.nation = this.stats.nationality;
        this.assetName = this.skin.painting;
        this.isResearch = shipBlueprints.some(b => b.id == this.group.group_type);
        this.hasRetrofit = shipRetrofits.some(r => r.group_id == this.group.group_type);
    }
}