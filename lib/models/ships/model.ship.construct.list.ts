/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import Construct from "./model.ship.construct";
import ShareCfgModel from "../model.sharecfg.base";
import ShareCfgModelList from "../model.sharecfg.list.base";

@ShareCfgModel.dependsOn([ "shipConstruction" ])
export default class ConstructList extends ShareCfgModelList<Construct> {
    constructor() {
        super(Construct);
    }
}