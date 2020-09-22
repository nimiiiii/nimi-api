import EquipSkinMixin from "./mixin.equipskin";

export default class EquipSkinThemeMixin {
    id: number;
    name: string;
    skins: EquipSkinMixin;

    constructor(data: any, skins: any) {
        this.id = data.id;
        this.name = data.name;
        this.skins = skins
                     .filter(s => data.ids.include(s.id))
                     .map(s => new EquipSkinMixin(s));
    }
}