/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import EquipmentItem from "../items/model.item.equip";
import Model from "../model.base";
import ShareCfgModel from "../model.sharecfg.base";
import Skill from "../shared/model.skill";

export default class Equipment extends ShareCfgModel {
    @Model.exclude()
    item: EquipmentItem;

    specialty: string;
    ammoType: string;
    torpedoCount: number;
    range: number;
    angle: number;
    scatter: number;
    skills: Skill[];
    attributes: { [key: string]: number }

    constructor(id: number) {
        super();

        this.item = new EquipmentItem(id);
    }

    async load() {
        const { data } = this.item;

        this.specialty = data.specialty;
        this.ammoType = data.ammo;
        this.torpedoCount = data.torpedo_ammo;
        this.range = data.range;
        this.angle = data.angle;
        this.scatter = data.scatter;

        this.skills = data.skill_id.map(id => new Skill(id));
        this.attributes = Object.keys(data)
            .filter(k => /attribute_(\d+)/.test(k))
            .reduce((obj, key, index) => {
                obj[key] = data[`value_${index + 1}`];
                return obj;
            }, {});
    }
}