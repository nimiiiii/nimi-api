/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import DropItem from "../items/model.item.drop";
import Model from "../model.base";
import ResearchItem from "./model.research.list.item";
import ShareCfgModel from "../model.sharecfg.base";

export default class Research extends ShareCfgModel {
    @Model.exclude()
    base: any;

    playerLevel: number;
    consume: { count: number, item: DropItem }[];
    drops: { count: number, item: DropItem }[];

    constructor(id: number) {
        super();

        this.base = new ResearchItem(id);
    }

    async load() {
        const { data } = this.base;

        this.mixin(this.base);

        this.playerLevel = data.lv_limit;
        this.consume = data.consume.map(([type, id, count]) => (
            {
                count,
                item: new DropItem(id, type)
            }
        ));
        this.drops = data.drop_client.map(([type, id, count]) => (
            {
                count,
                item: new DropItem(id, type)
            }
        ));
    }
}