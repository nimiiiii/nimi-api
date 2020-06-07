const ItemMixin = require("./itemmixin");
const EquipMixin = require("./equipmixin");
const ShipItemMixin = require("./shipitemmixin");
const PlayerResourceMixin = require("./playerresourcemixin");
const { ITEM_TYPE } = require("../../util/constants");

class DropItemMixin {
    constructor(typeId, id, { ships, stats, groups, skins, items, equipStats, resources }) {
        const type = ITEM_TYPE[typeId];

        if (type == "resource")
            Object.assign(this, new PlayerResourceMixin(resources.find(r => r.id == id), items));

        if (type == "item")
            Object.assign(this, new ItemMixin(items.find(i => i.id == id)));

        if (type == "equip")
            Object.assign(this, new EquipMixin(equipStats.find(e => e.id == id)));

        if (type == "ship") {
            const group = groups.find(g => g.group_type == id);
            const ship = ships.find(s => s.group_type == id);
            const stat = stats.find(s => s.id == ship.id);
            const skin = skins.find(s => s.ship_group == stat.skin_id);
            Object.assign(this, new ShipItemMixin({ ship, group, skin, stats: stat }));
        }
    }
}

module.exports = DropItemMixin;