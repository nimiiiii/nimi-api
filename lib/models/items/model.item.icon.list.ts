/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import IconFrame from "./model.item.chat";
import ShareCfgModel from "../model.sharecfg.base";
import ShareCfgModelList from "../model.sharecfg.list.base";

@ShareCfgModel.dependsOn([ "itemIconFrames" ])
export default class IconFrameList extends ShareCfgModelList<IconFrame> {
    constructor() {
        super(IconFrame);
    }
}