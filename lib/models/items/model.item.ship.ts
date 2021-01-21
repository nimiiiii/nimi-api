/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import RequestError from "lib/requestError";
import ShareCfgModel from "../model.sharecfg.base";
import { dependsOn, exclude } from "../model.helpers";

@dependsOn([ "ships", "shipGroups", "shipStats", "shipSkins" ])
export default class ShipItem extends ShareCfgModel {
    @exclude()
    ship: any;

    @exclude()
    stats: any;

    @exclude()
    skin: any;

    @exclude()
    group: any;

    id: number;
    groupId: number;
    name: string;
    rarity: number;
    assetName: string;
    breakoutLevel: number;

    constructor(groupId: number, breakoutLevel = 1) {
        super();

        if (breakoutLevel > 4 || breakoutLevel < 1)
            throw new RequestError(400, "Breakout level should only be between 1 and 4.");

        this.groupId = groupId;
        this.breakoutLevel = breakoutLevel;
    }

    async load(ships: any[], groups: any[], stats: any[], skins: any[]) {
        this.group = groups.find(g => g.group_type == this.groupId);

        if (!this.group)
            throw new RequestError(404, `Ship Group (ID: ${this.groupId}) not found.`);

        this.ship = ships.find(s => s.group_type == this.group.group_type);
        this.stats = stats.find(s => s.id == this.ship.id);
        this.skin = skins.find(s => s.id == this.stats.skin_id);

        this.id = this.ship.id;
        this.name = this.stats.name?.trim();
        this.rarity = this.stats.rarity;
        this.assetName = this.skin.painting;
    }
}