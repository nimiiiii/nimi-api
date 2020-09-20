const ItemMixin = require("./itemmixin");

class EquipSkinMixin extends ItemMixin {
    constructor(data) {
        super(data);
        this.themeId = data.themeid;
        this.type = data.type;
        this.description = data.desc;
        this.equipTypes = data.equip_type;
    }
}

module.exports = EquipSkinMixin;