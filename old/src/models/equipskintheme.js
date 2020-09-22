const Model = require("./base");
const RequestError = require("../util/requesterror");
const EquipSkinThemeMixin = require("./mixins/equipskinthememixin");

class EquipSkinTheme extends Model {
    constructor(themeId) {
        super();

        this._themeId = themeId;
    }

    async load(equipSkins, equipSkinThemes) {
        const theme = equipSkinThemes.find(t => t.id == this._themeId);

        if (!theme)
            throw new RequestError(404, "Equipment Skin Theme not found.");

        Object.assign(this, new EquipSkinThemeMixin(theme, equipSkins));
    }
}

module.exports = EquipSkinTheme;