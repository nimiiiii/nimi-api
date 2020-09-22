const Model = require("./base");
const ShipMixin = require("./mixins/shipmixin");

class ShipList extends Model {
    async load(ships, shipStats, shipGroups, shipSkins, shipRetrofits, shipBlueprints) {
        this.entries = shipGroups.map(group => {
            const ship = ships.find(s => s.group_type == group.group_type);
            const stats = shipStats.find(s => s.id == ship.id);
            const skin = shipSkins.find(s => s.id == stats.skin_id);

            return new ShipMixin({
                ship,
                group,
                stats,
                skin,
                retrofits: shipRetrofits,
                blueprints: shipBlueprints
            });
        });
    }
}

module.exports = ShipList;