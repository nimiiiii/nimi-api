const EquipSkinMixin = require("./equipskinmixin");

class EquipSkinThemeMixin {
    constructor(data, skins) {
        this.id = data.id;
        this.name = data.name;
        this.skins = skins
            .filter(s => data.ids.includes(s.id))
            .map(s => new EquipSkinMixin(s));
    }
}

module.exports = EquipSkinThemeMixin;