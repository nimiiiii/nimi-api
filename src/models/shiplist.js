const Model = require("./base");
const ShipListItem = require("./shiplistitem");

class ShipList extends Model {
    constructor(ships, stats, groups) {
        super();

        this.entries = groups.map(group => {
            const ship = ships
                .filter(s => s.group_type == group.group_type)
                .sort((a, b) => a.star - b.star)[0];
            const stat = stats.find(s => s.id == ship.id);
            return new ShipListItem(ship, stat, group).serialize();
        });
    }
}

module.exports = ShipList;