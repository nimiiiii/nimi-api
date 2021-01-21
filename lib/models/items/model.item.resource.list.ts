/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import Resource from "./model.item.resource";
import ShareCfgModelList from "../model.sharecfg.list.base";
import { dependsOn } from "../model.helpers";

@dependsOn([ "itemPlayerResources" ])
export default class ResourceList extends ShareCfgModelList<Resource> {
    constructor() {
        super(Resource);
    }
}