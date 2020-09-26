/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import MeowfficerSkill from "./model.meowfficer.skill";
import RequestError from "lib/requestError";
import ShareCfgModel from "../model.sharecfg.base";

@ShareCfgModel.dependsOn([ "meowfficers" ])
export default class Meowfficer extends ShareCfgModel {
    id: number;
    groupId: number;
    name: string;
    rarity: number;
    nation: number;
    assetName: string;
    background: string;
    skill: MeowfficerSkill;
    command: number;
    support: number;
    tactic: number;

    constructor(id: number) {
        super();

        this.id = id;
    }

    async load(meowfficers: any[]) {
        const data = meowfficers.find(m => m.id == this.id);

        if (!data)
            throw new RequestError(404, `Meowfficer (ID: ${this.id}) is not found.`);

        this.groupId = data.group_type;
        this.name = data.name?.trim();
        this.rarity = data.rarity;
        this.nation = data.nationality;
        this.assetName = data.painting;
        this.background = data.bg;
        this.command = data.command_value;
        this.support = data.support_value;
        this.tactic = data.tactic_value;
        this.skill = new MeowfficerSkill(data.skill_id);
    }
}