import ShipItemMixin from "./mixin.shipitem";

export default class ShipMixin extends ShipItemMixin {
    code: string;
    type: number;
    nation: string;
    hasRetrofit: boolean;
    isResearchShip: boolean;

    constructor({ ship, group, stats, skin, retrofits, blueprints }) {
        super({ ship, group, stats, skin });

        this.code = group.code;
        this.type = stats.type;
        this.nation = stats.nationality;
        this.hasRetrofit = retrofits.some(r => r.group_id == group.group_type);
        this.isResearchShip = blueprints.some(b => b.id == group.group_type);
    }
}