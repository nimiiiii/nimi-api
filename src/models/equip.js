const Model = require("./base");
const RequestError = require("../util/requesterror");
const EquipMixin = require("./mixins/equipmixin");
const SkillMixin = require("./mixins/skillmixin");

class Equip extends Model {
    constructor(equipId) {
        super();

        this._equipId = equipId;
    }

    async load(equipStats, skills) {
        const equip = equipStats.find(e => e.id == this._equipId);

        if (!equip)
            throw new RequestError(404, "Equipment not found.");

        Object.assign(this, new EquipMixin(equip));

        this.speciality = equip.specialty;
        this.ammoType = equip.ammo;
        this.torpedoAmmoCount = equip.torpedo_ammo;
        this.range = equip.range;
        this.angle = equip.angle;
        this.scatter = equip.scatter;

        this.skills = equip.skill_id.map(id => {
            const skill = skills.find(s => s.id == id);
            return new SkillMixin(skill);
        });

        this.attributes = Object.keys(equip)
            .filter(key => /attribute_(\d+)/.test(key))
            .reduce((obj, key, idx) => {
                obj[equip[key]] = equip[`value_${idx + 1}`];
                return obj;
            }, {});
    }
}

module.exports = Equip;