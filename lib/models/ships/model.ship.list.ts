/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import ShareCfgModel from "../model.sharecfg.base";
import ShareCfgModelList from "../model.sharecfg.list.base";
import ShipListItem from "./model.ship.list.item";

@ShareCfgModel.dependsOn([ "shipGroups" ])
export default class ShipList extends ShareCfgModelList<ShipListItem> {
    async load(groups: any[]): Promise<void> {
        this.entries = groups.map(g => new ShipListItem(g.group_type));
    }
}