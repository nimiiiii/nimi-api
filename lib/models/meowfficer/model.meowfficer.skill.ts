/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import RequestError from "lib/requestError";
import ShareCfgModel from "../model.sharecfg.base";

@ShareCfgModel.dependsOn([ "meowfficerSkills" ])
export default class MeowfficerSkill extends ShareCfgModel {
    id: number;
    nextId: number;
    name: string;
    level: number;
    description: { [key: number]: string }
    assetName: string;

    constructor(id: number) {
        super();

        this.id = id;
    }

    async load(skills: any[]) {
        const data = skills.find(s => s.id == this.id);

        if (!data)
            throw new RequestError(404, `Meowfficer Skill (ID: ${this.id}) is not found.`);

        this.name = data.name;
        this.nextId = data.next_id;
        this.level = data.lv;
        this.assetName = data.icon;
        this.description = data.desc.map(([level, text]) => ({ [level]: text }));
    }
}