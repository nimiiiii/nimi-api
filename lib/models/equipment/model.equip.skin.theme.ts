/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import EquipmentSkin from "./model.equip.skin";
import RequestError from "lib/requestError";
import ShareCfgModel from "../model.sharecfg.base";
import ShareCfgModelList from "../model.sharecfg.list.base";

@ShareCfgModel.dependsOn([ "equipSkinThemes" ])
export default class EquipmentSkinTheme extends ShareCfgModelList<EquipmentSkin> {
    id: number;
    name: string;

    constructor(id: number) {
        super(EquipmentSkin);

        this.id = id;
    }

    modify(themes: any[]) {
        const theme = themes.find(t => t.id == this.id);

        if (!theme)
            throw new RequestError(404, `Equipment Skin Theme (ID: ${this.id}) is not found.`);

        this.name = theme.name;

        return theme;
    }
}