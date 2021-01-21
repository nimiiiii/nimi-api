/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import RequestError from "lib/requestError";
import RetrofitNode from "./model.ship.retrofit.node";
import ShareCfgModel from "lib/models/model.sharecfg.base";
import { dependsOn, exclude } from "../model.helpers";

@dependsOn([ "shipRetrofits" ])
export default class ShipRetrofit extends ShareCfgModel {
    @exclude()
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