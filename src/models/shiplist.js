const Model = require("./base");
const ShipMixin = require("./mixins/shipmixin");

class ShipList extends Model {
    async load(ships, shipStats, shipGroups, shipRetrofits, shipBlueprints) {
        this.entries = shipGroups.map(group => {
            const ship = ships.find(s => s.group_type == group.group_type);
            const stats = shipStats.find(s => s.id == ship.id);

            return new ShipMixin({
                ship,
                group,
                stats,
                retrofits: shipRetrofits,
                blueprints: shipBlueprints
            });
        });
    }
}

module.exports = ShipList;