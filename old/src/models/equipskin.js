const Model = require("./base");
const RequestError = require("../util/requesterror");
const EquipSkinMixin = require("./mixins/equipskinmixin");

class EquipSkin extends Model {
    constructor(skinId) {
        super();

        this._skinId = skinId;
    }

    async load(equipSkins) {
        const skin = equipSkins.find(s => s.id == this._skinId);

        if (!skin)
            throw new RequestError(404, "Equipment Skin not found.");

        Object.assign(this, new EquipSkinMixin(skin));
    }
}

module.exports = EquipSkin;