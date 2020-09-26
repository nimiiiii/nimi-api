/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import Model from "../model.base";
import RequestError from "lib/requestError";
import ShareCfgModel from "../model.sharecfg.base";
import ShareCfgModelList from "../model.sharecfg.list.base";
import ShipSkinListItem from "./model.ship.skin.list.item";

@ShareCfgModel.dependsOn([ "shipSkins" ])
export default class ShipSkinList extends ShareCfgModelList<ShipSkinListItem> {
    @Model.exclude()
    groupId: number;

    constructor(groupId: number = undefined) {
        super();

        this.groupId = groupId;
    }

    async load(skins: any[]) {
        const entries = this.groupId !== undefined
            ? skins.filter(s => s.ship_group == this.groupId)
            : skins;

        if (entries.length < 1)
            throw new RequestError(404, `Ship (Group ID: ${this.groupId}) has no skins.`);

        this.entries = entries.map(s => new ShipSkinListItem(s.id));
    }
}