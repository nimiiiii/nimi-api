import SkillMixin from "lib/mixins/mixin.skills";
import Model from "./model.base";

export default class Ship extends Model {
    _groupId: number;
    _breakoutLevel: number;
    ammoCount: number;
    armorType: number;
    equipment: any[];
    attributes: any;
    skills: SkillMixin[];
    breakouts: any[];
    skins: any[];

    constructor(groupId: number, breakoutLevel: number) {
        super();

        this._groupId = groupId;
        this._breakoutLevel = breakoutLevel;
    }

    async load(ships: any, shipStats: any, shipGroups: any, shipSkins: any,
        skills: any, shipBreakouts: any, shipRetrofits: any, shipBlueprints: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
}