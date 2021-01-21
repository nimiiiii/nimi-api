/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import EquipmentItem from "../items/model.item.equip";
import ShareCfgModelList from "../model.sharecfg.list.base";
import { dependsOn } from "../model.helpers";

@dependsOn([ "equipStats" ])
export default class EquipmentItemList extends ShareCfgModelList<EquipmentItem> {
    constructor() {
        super(EquipmentItem);
    }
}