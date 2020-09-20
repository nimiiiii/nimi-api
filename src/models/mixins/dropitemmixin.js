const ItemMixin = require("./itemmixin");
const EquipMixin = require("./equipmixin");
const ShipItemMixin = require("./shipitemmixin");
const FurnitureMixin = require("./furnituremixin");
const PlayerResourceMixin = require("./playerresourcemixin");

class DropItemMixin {
    constructor(typeId, id, { ships, stats, groups, skins,
        items, equipStats, resources, furniture }) {
        this.dropType = typeId;

        if (this.dropType == 1)
            Object.assign(this, new PlayerResourceMixin(resources.find(r => r.id == id), items));

        if (this.dropType == 2)
            Object.assign(this, new ItemMixin(items.find(i => i.id == id)));

        if (this.dropType == 3)
            Object.assign(this, new EquipMixin(equipStats.find(e => e.id == id)));

        if (this.dropType == 4) {
            const ship = ships.find(s => s.id == id);
            const stat = stats.find(s => s.id == ship.id);
            const group = groups.find(g => g.group_type == ship.group_type);
            const skin = skins.find(s => s.id == stat.skin_id);
            Object.assign(this, new ShipItemMixin({ ship, group, skin, stats: stat }));
        }

        if (this.dropType == 5)
            Object.assign(this, new FurnitureMixin(furniture.find(f => f.id == id)));
    }
}

module.exports = DropItemMixin;