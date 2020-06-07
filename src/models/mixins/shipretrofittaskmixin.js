const ItemMixin = require("./itemmixin");
const SkillMixin = require("./skillmixin");

class ShipRetrofitTaskMixin {
    constructor(data, items, skills) {
        this.id = data.id;
        this.name = data.name,
        this.minLevel = data.level_limit;
        this.minStars = data.star_limit;
        this.assetName = data.icon;

        const skill = skills.find(skill => skill.id == data.skill_id);
        this.skill = (skill) ? new SkillMixin(skill) : null;

        this.prerequisites = data.condition_id;
        this.cost = {
            gold: data.use_gold,
            ship: data.use_ship,
            item: data.use_item.map(entry => {
                return entry.map(([id, count]) => {
                    return {
                        count,
                        data: new ItemMixin(items.find(e => e.id == id))
                    };
                });
            })
        };
    }
}

module.exports = ShipRetrofitTaskMixin;