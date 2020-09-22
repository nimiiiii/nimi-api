const Model = require("./base");
const EquipSkinMixin = require("./mixins/equipskinmixin");

class EquipSkinList extends Model {
    constructor() {
        super();
    }

    async load(equipSkins) {
        this.entries =  equipSkins.map(s => new EquipSkinMixin(s));
    }
}

module.exports = EquipSkinList;