/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import Resource from "./model.item.resource";
import ShareCfgModel from "../model.sharecfg.base";
import ShareCfgModelList from "../model.sharecfg.list.base";

@ShareCfgModel.dependsOn([ "itemPlayerResources" ])
export default class ResourceList extends ShareCfgModelList<Resource> {
    constructor() {
        super(Resource);
    }
}