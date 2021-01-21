/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import RequestError from "lib/requestError";
import ShareCfgModel from "../model.sharecfg.base";
import { dependsOn } from "../model.helpers";

@dependsOn([ "items" ])
export default class Item extends ShareCfgModel {
    id: number;
    name: string;
    rarity: number;
    assetName: string;

    constructor(id: number) {
        super();

        this.id = id;
    }

    async load(items: any[]) {
        const item = items.find(i => i.id == this.id);

        if (!item)
            throw new RequestError(404, `Item (ID: ${this.id}) is not found.`);

        this.name = item.name.trim();
        this.rarity = item.rarity;
        this.assetName = item.icon;
    }
}