import ItemMixin from "./mixin.item";

export default class EquipSkinMixin extends ItemMixin {
    themeId: number;
    type: number;
    description: string;
    equipTypes: string;

    constructor(data: any) {
        super(data);

        this.themeId = data.themeId;
        this.type = data.type;
        this.description = data.desc;
        this.equipTypes = data.equip_type;
    }
}