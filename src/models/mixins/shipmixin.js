const { SHIP_HULL_TYPE } = require("../../util/constants");

class ShipMixin {
    constructor({ ship, group, stats, retrofits, blueprints }) {
        this.id = ship.id;
        this.group = group.group_type;
        this.name = stats.name;
        this.code = group.code;
        this.type = SHIP_HULL_TYPE[stats.type];
        this.rarity = stats.rarity - 1;
        this.nation = stats.nationality;
        this.hasRetrofit = retrofits.some(r => r.group_id == group.group_type);
        this.isResearchShip = blueprints.some(b => b.id == group.group_type);
    }
}

module.exports = ShipMixin;