const Model = require("./base");
const EquipMixin = require("./mixins/equipmixin");

class EquipList extends Model {
    async load(equipStats) {
        this.entries = equipStats.map(equip => {
            return new EquipMixin(equip);
        });
    }
}

module.exports = EquipList;