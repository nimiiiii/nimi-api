/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import MeowfficerSkill from "./model.meowfficer.skill";
import ShareCfgModelList from "../model.sharecfg.list.base";

export default class MeowfficerSkillList extends ShareCfgModelList<MeowfficerSkill> {
    constructor() {
        super(MeowfficerSkill);
    }
}