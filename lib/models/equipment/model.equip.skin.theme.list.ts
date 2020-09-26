import EquipSkinTheme from "./model.equip.skin.theme";
import ShareCfgModel from "../model.sharecfg.base";
import ShareCfgModelList from "../model.sharecfg.list.base";

@ShareCfgModel.dependsOn([ "equipSkinThemes" ])
export default class EquipSkinThemeList extends ShareCfgModelList<EquipSkinTheme> {
    async load(themes: any[]) {
        this.entries = themes.map(t => new EquipSkinTheme(t.id));
    }
}