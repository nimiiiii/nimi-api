/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import ShareCfgModelList from "../model.sharecfg.list.base";
import ShipListItem from "./model.ship.list.item";
import { dependsOn } from "../model.helpers";

@dependsOn([ "shipGroups" ])
export default class ShipList extends ShareCfgModelList<ShipListItem> {
    constructor() {
        super(ShipListItem, "group_type");
    }
}