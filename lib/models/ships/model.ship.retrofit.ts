/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import Item from "../items/model.item";
import Model from "lib/models/model.base";
import RequestError from "lib/requestError";
import ShareCfgModel from "lib/models/model.sharecfg.base";
import Skill from "lib/models/shared/model.skill";

@ShareCfgModel.dependsOn([ "shipRetrofits" ])
export default class ShipRetrofit extends ShareCfgModel {
    @Model.exclude()
    groupId: number;

    nodes: {
        row: number,
        task: RetrofitNode
    }[][];

    constructor(groupId: number) {
        super();

        this.groupId = groupId;
    }

    async load(retrofits: any[]) {
        const retrofit = retrofits.find(r => r.group_id == this.groupId);

        if (!retrofit)
            throw new RequestError(404, "Ship does not have retrofit data.");

        this.nodes = retrofit.transform_list.map(col =>
            col.map(([row, id]) => ({
                row,
                task: new RetrofitNode(id)
            }))
        );
    }
}

@ShareCfgModel.dependsOn([ "shipRetrofitTasks" ])
class RetrofitNode extends ShareCfgModel {
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