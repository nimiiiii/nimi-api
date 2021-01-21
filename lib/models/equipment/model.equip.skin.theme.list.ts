/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import EquipSkinTheme from "./model.equip.skin.theme";
import ShareCfgModelList from "../model.sharecfg.list.base";
import { dependsOn } from "../model.helpers";

@dependsOn([ "equipSkinThemes" ])
export default class EquipmentSkinThemeList extends ShareCfgModelList<EquipSkinTheme> {
    constructor() {
        super(EquipSkinTheme);
    }
}