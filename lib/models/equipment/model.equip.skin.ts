/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import Item from "../items/model.item";
import RequestError from "lib/requestError";
import { dependsOn } from "../model.helpers";

@dependsOn([ "equipSkins" ])
export default class EquipmentSkin extends Item {
    themeId: number;
    type: number;
    description: string;
    equipTypes: number[];

    constructor(id: number) {
        super(id);
    }

    async load(skins: any[]) {
        const skin = skins.find(s => s.id == this.id);

        if (!skin)
            throw new RequestError(404, `Equipment Skin (ID: ${this.id}) is not found.`);

        this.name = skin.name?.trim();
        this.rarity = skin.rarity;
        this.assetName = skin.icon;
        this.themeId = skin.themeId;
        this.type = skin.type;
        this.description = skin.desc;
        this.equipTypes = skin.equip_type;
    }
}