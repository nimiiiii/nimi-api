/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import RequestError from "lib/requestError";
import ShareCfgModel from "../model.sharecfg.base";
import { dependsOn, exclude } from "../model.helpers";

@dependsOn([ "equipStats" ])
export default class EquipmentItem extends ShareCfgModel {
    @exclude()
    data: any;

    id: number;
    name: string;
    type: number;
    nation: number;
    description: string;
    assetName: string;

    constructor(id: number) {
        super();

        this.id = id;
    }

    async load(stats: any[]) {
        this.data = stats.find(e => e.id == this.id);

        if (!this.data)
            throw new RequestError(404, `Equipment (ID: ${this.id}) is not found.`);

        this.name = this.data.name?.trim();
        this.type = this.data.type;
        this.nation = this.data.nationality;
        this.description = this.data.descrip;
        this.assetName = this.data.icon;
    }
}