/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import CommissionItem from "./model.commission.list.item";
import DropItem from "../items/model.item.drop";
import Model from "../model.base";
import ShareCfgModel from "../model.sharecfg.base";

export default class Commission extends ShareCfgModel {
    @Model.exclude()
    base: CommissionItem;

    oil: number;
    type: number;
    requirements: {
        shipCount: number,
        shipTypes: number[],
        shipLevel: number,
        playerLevel: number
    };
    drops: {
        guaranteed: { count: string, item: DropItem }[],
        special: { count: string, item: DropItem },
        gold: number,
        oil: number,
        exp: number
    };

    constructor(id: number) {
        super();

        this.base = new CommissionItem(id);
    }

    async load() {
        const { data } = this.base;

        this.mixin(this.base);

        this.oil = data.oil;
        this.type = data.type;
        this.requirements = {
            shipCount: data.ship_num,
            shipTypes: data.ship_type,
            shipLevel: data.ship_lv,
            playerLevel: data.lv
        };

        this.drops = {
            guaranteed: data.drop_display.map(d => (
                {
                    count: d.nums,
                    item: new DropItem(d.id, d.type)
                }
            )),
            special: (!Array.isArray(data.special_drop))
                ? { item: new DropItem(data.special_drop.id, data.special_drop.type), count: data.special_drop.nums }
                : null,
            gold: data.drop_gold_max,
            oil: data.drop_oil_max,
            exp: data.exp
        };
    }
}