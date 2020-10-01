/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import CommissionItem from "./model.commission.list.item";
import ShareCfgModel from "../model.sharecfg.base";
import ShareCfgModelList from "../model.sharecfg.list.base";

@ShareCfgModel.dependsOn([ "commissions" ])
export default class CommissionList extends ShareCfgModelList<CommissionItem> {
    constructor() {
        super(CommissionItem);
    }
}