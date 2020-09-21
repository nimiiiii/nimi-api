import Model from "./model.base";
import RequestError from "../requestError";
import EquipMixin from "../mixins/mixin.equip";
import SkillMixin from "../mixins/mixin.skills";

export default class Equip extends Model {
    _equipId: number;
    specialty: any;
    ammoType: any;
    torpedoAmmoCount: number;
    range: number;
    angle: number;
    scatter: number;
    skills: SkillMixin;
    attributes: {};

    constructor(equipId: number) {
        super();

        this._equipId = equipId;
    }

    async load(equipStats: any, skills: any): Promise<void> {
        let equip = equipStats.find((e: any) => e.id == this._equipId);

        if (!equip) throw new RequestError(404, "Equipment not found");

        Object.assign(this, new EquipMixin(equip));

        this.specialty = equip.specialty;
        this.ammoType = equip.ammoType;
        this.torpedoAmmoCount = equip.torpedo_ammo;
        this.range = equip.range;
        this.angle = equip.angle;
        this.scatter = equip.scatter;

        this.skills = equip.skill_id.map((id: any) => {
            let skill = skills.find(s => s.id == id);
            return new SkillMixin(skill);
        });

        this.attributes = Object.keys(equip)
            .filter(k => /attribute_(\d+)/.test(k))
            .reduce((o, k, i) => {
                o[equip[k]] = equip[`value_${i + 1}`];

                return o;
            }, {})
    }
}