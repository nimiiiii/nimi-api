/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import RequestError from "lib/requestError";
import ShareCfgModel from "../model.sharecfg.base";

@ShareCfgModel.dependsOn([ "equipStats" ])
export default class Equipment extends ShareCfgModel {
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
        const data = stats.find(e => e.id == this.id);

        if (!data)
            throw new RequestError(404, `Equipment (ID: ${this.id}) is not found.`);

        this.name = data.name;
        this.type = data.type;
        this.nation = data.nationality;
        this.description = data.descrip;
        this.assetName = data.icon;
    }
}