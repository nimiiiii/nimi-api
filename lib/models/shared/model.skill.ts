/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import RequestError from "../../../lib/requestError";
import ShareCfgModel from "../model.sharecfg.base";

@ShareCfgModel.dependsOn([ "skills" ])
export default class Skill extends ShareCfgModel {
    id: number;
    name: string;
    type: number;
    description: string;
    descriptionValues: string[];

    constructor(id: number) {
        super();
        this.id = id;
    }

    async load(skills: any[]): Promise<void> {
        const skill = skills.find(s => s.id == this.id);

        if (!skill)
            throw new RequestError(404, `Skill (ID: ${this.id}) is not found.`);

        this.name = skill.name.trim();
        this.type = skill.type;
        this.description = skill.desc;
        this.descriptionValues = (skill.desc_add[0])
            ? skill.desc_add[0].map(e => e[0])
            : [];
    }
}