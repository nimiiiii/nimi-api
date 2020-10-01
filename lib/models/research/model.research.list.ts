/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import ResearchItem from "./model.research.list.item";
import ShareCfgModel from "../model.sharecfg.base";
import ShareCfgModelList from "../model.sharecfg.list.base";

@ShareCfgModel.dependsOn([ "research" ])
export default class ResearchList extends ShareCfgModelList<ResearchItem> {
    constructor() {
        super(ResearchItem);
    }
}