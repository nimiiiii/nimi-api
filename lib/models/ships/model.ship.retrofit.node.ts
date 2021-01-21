/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import Item from "../items/model.item";
import RequestError from "lib/requestError";
import ShareCfgModel from "../model.sharecfg.base";
import Skill from "../shared/model.skill";
import { dependsOn } from "../model.helpers";

@dependsOn([ "shipRetrofitTasks" ])
export default class RetrofitNode extends ShareCfgModel {
    id: number;
    name: string;
    minLevel: number;
    minStars: number;
    assetName: string;
    prerequisite: number;
    skill: Skill;
    cost: {
        gold: number,
        ship: number,
        item: {
            count: number,
            data: Item
        }[]
    }

    constructor(id: number) {
        super();

        this.id = id;
    }

    async load(tasks: any[]) {
        const data = tasks.find(t => t.id == this.id);

        if (!data)
            throw new RequestError(404, `Retrofit Task (ID ${this.id}) is not found.`);

        this.name = data.name;
        this.minLevel = data.level_limit;
        this.minStars = data.star_limit;
        this.assetName = data.icon;
        this.prerequisite = data.condition_id;
        this.skill = (data.skill_id) ? new Skill(data.skill_id) : null;
        this.cost = {
            gold: data.use_gold,
            ship: data.use_ship,
            item: data.use_item.map(e =>
                e.map(([id, count]) => ({
                    count,
                    data: new Item(id)
                }))
            )
        };
    }
}