import EquipSkin from "./model.equip.skin";
import RequestError from "lib/requestError";
import ShareCfgModel from "../model.sharecfg.base";
import ShareCfgModelList from "../model.sharecfg.list.base";

@ShareCfgModel.dependsOn([ "equipSkinThemes" ])
export default class EquipSkinTheme extends ShareCfgModelList<EquipSkin> {
    id: number;
    name: string;

    constructor(id: number) {
        super();

        this.id = id;
    }

    async load(themes: any[]) {
        const theme = themes.find(t => t.id == this.id);

        if (!theme)
            throw new RequestError(404, `Equipment Skin Theme (ID: ${this.id}) is not found.`);

        this.name = theme.name;
        this.entries = theme.ids.map((id: number) => new EquipSkin(id));
    }
}