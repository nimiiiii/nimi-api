const { SHIP_HULL_TYPE } = require("../../util/constants");
const ShipItemMixin = require("./shipitemmixin");

class ShipMixin extends ShipItemMixin {
    constructor({ ship, group, stats, skin, retrofits, blueprints }) {
        super({ ship, group, stats, skin });

        this.code = group.code;
        this.type = SHIP_HULL_TYPE[stats.type];
        this.nation = stats.nationality;
        this.hasRetrofit = retrofits.some(r => r.group_id == group.group_type);
        this.isResearchShip = blueprints.some(b => b.id == group.group_type);
    }
}

module.exports = ShipMixin;