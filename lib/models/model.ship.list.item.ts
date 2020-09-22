import RequestError from "lib/requestError";
import Model from "./model.base";

export default class ShipListItem extends Model {
    _breakoutLevel: number;
    id: number;
    name: string;
    code: number;
    type: number;
    group: number;
    rarity: number;
    nation: string;
    assetName: string;
    isResearch: boolean;
    hasRetrofit: boolean;

    constructor(groupId: number, breakoutLevel: number = 1) {
        super();

        if (breakoutLevel > 4 || breakoutLevel < 1)
            throw new RequestError(400, "Breakout level should only be between 1 and 4.");

        this.group = groupId;
        this._breakoutLevel = breakoutLevel;
    }

    async load(ships : any[], shipGroups : any[], shipStats : any[], shipSkins : any[], shipRetrofits : any[], shipBlueprints : any[]): Promise<void> {
        const group = shipGroups.find(g => g.group_type == this.group);

        if (!group)
            throw new RequestError(404, "Ship Group not found.");

        const ship = ships.filter(s => s.group_type == group.group_type)[this._breakoutLevel - 1];
        const stats = shipStats.find(s => s.id == ship.id);
        const skin = shipSkins.find(s => s.id == stats.skin_id);

        this.id = ship.id;
        this.name = stats.name.trim();
        this.code = group.code;
        this.type = stats.type;
        this.group = group.group_type;
        this.rarity = stats.rarity;
        this.nation = stats.nationality;
        this.assetName = skin.painting;
        this.isResearch = shipBlueprints.some(b => b.id == group.group_type);
        this.hasRetrofit = shipRetrofits.some(r => r.group_id == group.group_type);

        this.save({ ship, group, stats });
    }
}