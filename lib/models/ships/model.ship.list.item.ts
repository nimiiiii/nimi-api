/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import Model from "../model.base";
import ShareCfgModel from "../model.sharecfg.base";
import ShipItem from "../items/model.item.ship";

@ShareCfgModel.dependsOn([ "shipRetrofits", "shipBlueprints" ])
export default class ShipListItem extends ShareCfgModel {
    @Model.exclude()
    item: ShipItem;

    id: number;
    name: string;
    code: number;
    type: number;
    rarity: number;
    nation: string;
    groupId: number;
    assetName: string;
    research: boolean;
    retrofit: boolean;

    constructor(groupId: number, breakoutLevel = 1) {
        super();

        this.item = new ShipItem(groupId, breakoutLevel);
    }

    async load(retrofits : any[], blueprints : any[]) {
        this.mixin(this.item);

        const { stats, group } = this.item;

        this.code = group.code;
        this.type = stats.type;
        this.groupId = group.group_type;
        this.nation = stats.nationality;
        this.research = blueprints.some(b => b.id == group.group_type);
        this.retrofit = retrofits.some(r => r.group_id == group.group_type);
    }
}