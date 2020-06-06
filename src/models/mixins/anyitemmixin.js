const ItemMixin = require("./itemmixin");
const ShipItemMixin = require("./shipitemmixin");
const PlayerResourceMixin = require("./playerresourcemixin");

// Helper Mixin for Wildcard Item Types
class AnyItemMixin {
    constructor(type, id, { ships, stats, groups, skins, items, resources }) {
        if (type == "resource")
            Object.assign(this, new PlayerResourceMixin(resources.find(r => r.id == id), items));

        if (type == "item")
            Object.assign(this, new ItemMixin(items.find(i => i.id == id)));

        if (type == "ship") {
            const group = groups.find(g => g.group_type == id);
            const ship = ships.find(s => s.group_type == id);
            const stat = stats.find(s => s.id == ship.id);
            const skin = skins.find(s => s.ship_group == stat.skin_id);
            Object.assign(this, new ShipItemMixin({ ship, group, skin, stats: stat }));
        }
    }
}

module.exports = AnyItemMixin;