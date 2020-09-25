/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import Model from "../model.base";
import RequestError from "../../../lib/requestError";
import ShareCfgModel from "../model.sharecfg.base";

@ShareCfgModel.dependsOn([ "shipSkins" ])
export default class ShipSkinListItem extends ShareCfgModel {
    @Model.exclude()
    data: any;

    id: number;
    name: string;
    type: number;
    description: string;
    assetName: string;

    constructor(id: number) {
        super();

        this.id = id;
    }

    async load(skins: any[]) {
        this.data = skins.find(s => s.id == this.id);

        if (!this.data)
            throw new RequestError(404, `Ship Skin (ID: ${this.id}) is not found.`);

        this.name = this.data.name?.trim();
        this.type = this.data.skin_type;
        this.description = this.data.desc;
        this.assetName = this.data.painting;
    }
}