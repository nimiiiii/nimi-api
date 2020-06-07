const Model = require("./base");
const EquipSkinThemeMixin = require("./mixins/equipskinthememixin");

class EquipSkinThemeList extends Model {
    constructor() {
        super();
    }

    async load(equipSkins, equipSkinThemes) {
        this.entries =  equipSkinThemes.map(t => new EquipSkinThemeMixin(t, equipSkins));
    }
}

module.exports = EquipSkinThemeList;