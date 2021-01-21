/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import ShareCfgModelList from "../model.sharecfg.list.base";
import ShipSkinListItem from "./model.ship.skin.list.item";
import { dependsOn, exclude } from "../model.helpers";

@dependsOn([ "shipSkins" ])
export default class ShipSkinList extends ShareCfgModelList<ShipSkinListItem> {
    @exclude()
    groupId: number;

    constructor(groupId: number = undefined) {
        super(ShipSkinListItem);

        this.groupId = groupId;
    }

    modify(skins: any[]) {
        return this.groupId !== undefined ? skins.filter(s => s.ship_group == this.groupId) : skins;
    }
}