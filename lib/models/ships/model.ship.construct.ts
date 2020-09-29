/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import Item from "../items/model.item";
import RequestError from "lib/requestError";
import ShareCfgModel from "../model.sharecfg.base";
import { NAMECODE_REGEX, TAG_REGEX } from "lib/constants";

@ShareCfgModel.dependsOn([ "shipConstruction", "codes" ])
export default class Construct extends ShareCfgModel {
    id: number;
    type: number;
    name: string;
    cost: { currency: number, gold: number };
    rate: { name: string, percentage: number, pickup?: boolean }
    currency: Item;

    constructor(id: number) {
        super();

        this.id = id;
    }

    async load(constructs: any[], codes: any[]) {
        const construct = constructs.find(c => c.id == this.id);

        if (!construct)
            throw new RequestError(404, `Construct (ID: ${this.id}) was not found.`);

        this.type = construct.type;
        this.name = construct.name;
        this.cost = { currency: construct.number_1, gold: construct.use_gold };
        this.rate = construct.rate_tip.map((t: string) => {
            const [ key, value ] = t.replace(TAG_REGEX, "").replace("(up!)", "").split("：");
            const name = (NAMECODE_REGEX.test(key))
                ? codes.find(n => n.id == parseInt(NAMECODE_REGEX.exec(key).pop()))?.name?.trim()
                : key;
            const percentage = parseFloat(value);
            const pickup = t.includes("up!");
            return { name, percentage, pickup };
        });
        this.currency = new Item(construct.use_item);
    }
}