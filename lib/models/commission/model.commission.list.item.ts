/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import RequestError from "lib/requestError";
import Model from "../model.base";
import ShareCfgModel from "../model.sharecfg.base";

@ShareCfgModel.dependsOn([ "commissions" ])
export default class CommissionItem extends ShareCfgModel {
    @Model.exclude()
    data: any;

    id: number;
    name: string;
    time: number;
    description: string;
    assetName: string;

    constructor(id: number) {
        super();

        this.id = id;
    }

    async load(commissions: any[]) {
        const commission = commissions.find(c => c.id == this.id);

        if (!commission)
            throw new RequestError(404, `Commission (ID: ${this.id}) is not found.`);

        this.data = commission;

        this.name = commission.title;
        this.time = commission.collect_time;
        this.description = commission.description;
        this.assetName = commission.icon;
    }
}