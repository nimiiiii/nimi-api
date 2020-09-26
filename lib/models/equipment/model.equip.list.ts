/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import Equipment from "./model.equip";
import ShareCfgModel from "../model.sharecfg.base";
import ShareCfgModelList from "../model.sharecfg.list.base";

@ShareCfgModel.dependsOn([ "equipStats" ])
export default class EquipmentItemList extends ShareCfgModelList<Equipment> {
    async load(items: any[]) {
        this.entries = items.map(i => new Equipment(i.id));
    }
}