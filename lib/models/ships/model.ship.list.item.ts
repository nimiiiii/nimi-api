import Model from "../model.base";
import ShareCfgModel from "../model.sharecfg.base";

@ShareCfgModel.dependsOn([
    "ships",
    "shipGroups",
    "shipStats",
    "shipSkins",
    "shipRetrofits",
    "shipBlueprints"
])
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
            throw new Error("Breakout level should only be between 1 and 4.");

        this.groupId = groupId;
        this.breakoutLevel = breakoutLevel;
    }

    async load(
        ships : any[],
        groups : any[],
        stats : any[],
        skins : any[],
        retrofits : any[],
        blueprints : any[]
    ): Promise<void> {
        this.group = groups.find(g => g.group_type == this.groupId);

        if (!this.group)
            throw new Error(`Ship Group (ID: ${this.groupId}) not found.`);

        this.ship = ships.filter(s => s.group_type == this.group.group_type)[this.breakoutLevel - 1];
        this.stats = stats.find(s => s.id == this.ship.id);
        this.skin = skins.find(s => s.id == this.stats.skin_id);

        this.id = this.ship.id;
        this.name = this.stats.name.trim();
        this.code = this.group.code;
        this.type = this.stats.type;
        this.groupId = this.group.group_type;
        this.rarity = this.stats.rarity;
        this.nation = this.stats.nationality;
        this.assetName = this.skin.painting;
        this.isResearch = blueprints.some(b => b.id == this.group.group_type);
        this.hasRetrofit = retrofits.some(r => r.group_id == this.group.group_type);
    }
}