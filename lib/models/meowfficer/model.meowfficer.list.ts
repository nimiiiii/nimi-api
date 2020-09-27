/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import Meowfficer from "./model.meowfficer";
import ShareCfgModel from "../model.sharecfg.base";
import ShareCfgModelList from "../model.sharecfg.list.base";

@ShareCfgModel.dependsOn([ "meowfficers" ])
export default class MeowfficerList extends ShareCfgModelList<Meowfficer> {
    constructor() {
        super(Meowfficer);
    }
}