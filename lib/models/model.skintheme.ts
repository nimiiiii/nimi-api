import Model from "./model.base";
import RequestError from "../requestError";
import EquipSkinThemeMixin from "../mixins/mixin.equipskintheme";

class EquipSkinTheme extends Model {
    private _themeId: number;

    constructor(themeId) {
        super();

        this._themeId = themeId;
    }

    async load(equipSkins: any, equipSkinThemes: any) {
        let theme = equipSkinThemes.find((t: any) => t.id == this._themeId);

        if (!theme) throw new RequestError(404, "Equipment skin theme not found");

        Object.assign(this, new EquipSkinThemeMixin(theme, equipSkins));
    }
}