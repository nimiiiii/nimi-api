import ItemMixin from "./mixin.item";
import EquipMixin from "./mixin.equip";
import ShipItemMixin from "./mixin.shipitem";
import FurnitureMixin from "./mixin.furniture";
import PlayerResourceMixin from "./mixin.playerresouce";

export default class DropItemMixin {
    dropType: number;

    constructor(typeId: number, id: number, { ships, stats, groups, skins, items, equipStats, 
                resources, furniture }) {
                    this.dropType = typeId;

                    switch(this.dropType) {
                        case 1:
                            Object.assign(this, new PlayerResourceMixin(resources.find(r => r.id == id), items));
                            break;
                        case 2:
                            Object.assign(this, new ItemMixin(items.find(i => i.id == id)));
                            break;
                        case 3:
                            Object.assign(this, new EquipMixin(equipStats.find(e => e.id == id)));
                            break;
                        case 4:
                            let ship = ships.find(s => s.id == id);
                            let stat = stats.find(s => s.id == ship.id);
                            let group = groups.find(s => s.id == stat.skin_id);
                            let skin = skins.find(s => s.id == stat.skin_id);

                            Object.assign(this, new ShipItemMixin({ ship, group, skin, stats: stat }));
                            break;
                        case 5:
                            Object.assign(this, new FurnitureMixin(furniture.find(f => f.id == id)));
                            break;

                        default:
                            break;
                    }
                }
}