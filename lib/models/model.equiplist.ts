import Model from "./model.base";
import EquipMixin from "../mixins/mixin.equip";

export default class EquipList extends Model {
    async load(equipStats: any) {
        this.entries = equipStats.map((equip: any) => {
            return new EquipMixin(equip);
        })
    }
}