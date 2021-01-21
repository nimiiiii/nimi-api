/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import ResearchItem from "./model.research.list.item";
import ShareCfgModelList from "../model.sharecfg.list.base";
import { dependsOn } from "../model.helpers";

@dependsOn([ "research" ])
export default class ResearchList extends ShareCfgModelList<ResearchItem> {
    constructor() {
        super(ResearchItem);
    }
}