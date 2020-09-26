import EquipSkin from "./model.equip.skin";
import ShareCfgModel from "../model.sharecfg.base";
import ShareCfgModelList from "../model.sharecfg.list.base";

@ShareCfgModel.dependsOn([ "equipSkins" ])
export default class EquipSkinList extends ShareCfgModelList<EquipSkin> {
    async load(skins: any[]) {
        this.entries = skins.map(s => new EquipSkin(s.id));
    }
}