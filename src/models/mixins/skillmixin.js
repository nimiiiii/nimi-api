const { SHIP_SKILL_TYPE } = require("../../util/constants");

class SkillMixin {
    constructor(data) {
        this.id = data.id;
        this.name = data.name.trim();
        this.type = SHIP_SKILL_TYPE[data.type];
        this.description = data.desc;
        this.descriptionMod = (data.desc_add[0])
            ? data.desc_add[0].map(e => e[0])
            : [];
    }
}

module.exports = SkillMixin;