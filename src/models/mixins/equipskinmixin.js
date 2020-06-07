const { EQUIPMENT_TYPE } = require("../../util/constants");

class EquipSkinMixin {
    constructor(data) {
        this.id = data.id;
        this.themeId = data.themeid;
        this.name = data.name;
        this.rarity = data.rarity;
        this.assetName = data.icon;

        // TODO: Disambiguate equip skin types
        this.type = data.type;
        this.description = data.desc;
        this.equipTypes = data.equip_type.map(id => EQUIPMENT_TYPE[id]);
    }
}

module.exports = EquipSkinMixin;