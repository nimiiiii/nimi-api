/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import RequestError from "lib/requestError";
import ShareCfgModel from "../model.sharecfg.base";
import { dependsOn, exclude } from "../model.helpers";

@dependsOn([ "research" ])
export default class ResearchItem extends ShareCfgModel {
    @exclude()
    data: any;

    id: number;
    type: number;
    rarity: number;
    name: string;
    title: string;
    description: string;
    time: number;
    blueprintVersion: number;

    constructor(id: number) {
        super();

        this.id = id;
    }

    async load(researchs: any[]) {
        const research = researchs.find(r => r.id == this.id);

        if (!researchs)
            throw new RequestError(404, `Research (ID: ${this.id}) was not found.`);

        this.data = research;

        this.type = research.type;
        this.rarity = research.rarity;
        this.name = research.name;
        this.title = research.sub_name;
        this.description = research.desc;
        this.time = research.time;
        this.blueprintVersion = research.blueprint_version;
    }
}