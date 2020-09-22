import Model from "./model.base";
import EquipSkinMixin from "../mixins/mixin.equipskin";

export default class EquipSkinList extends Model {
    constructor() {
        super();
    }

    async load(equipSkins: any) {
        this.entries = equipSkins.map((s: any) => new EquipSkinMixin(s));
    }
}