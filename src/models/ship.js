const Model = require("./base");
const RequestError = require("../util/requesterror");
const ShipMixin = require("./mixins/shipmixin");
const ShipSkinMixin = require("./mixins/shipskinmixin");
const ShipSkillMixin = require("./mixins/shipskillmixin");
const ShipAcquisitionMixin = require("./mixins/shipacquisitionmixin");
const {
    SHIP_ATTR_TYPE,
    SHIP_ARMOR_TYPE,
    EQUIPMENT_TYPE
} = require("../util/constants");

// Models are used for structuring JSON outputs.
class Ship extends Model {
    constructor(groupId, breakoutLevel) {
        super();

        // Properties preceeded with an underscore and are considered
        // as private properties thus excluded from serialization.
        this._groupId = groupId;
        this._breakoutLevel = (!isNaN(breakoutLevel)) ? breakoutLevel : 1;
    }

    // Arguments must match from it's specified Remote.
    // See SharedCfgRemote for argument name reference.
    async load(ships, shipStats, shipGroups, shipSkins,
        shipSkills, shipBreakouts, shipRetrofits, shipBlueprints) {
        const group = shipGroups.find(g => g.group_type == this._groupId);

        if (!group)
            throw new RequestError(404, "Ship Group not found.");

        if (this._breakoutLevel > 4 || this._breakoutLevel < 1)
            throw new RequestError(400, "Breakout level should only be between 1 to 4.");

        const ship = ships.filter(s => s.group_type == group.group_type)[this._breakoutLevel - 1];
        const stats = shipStats.find(s => s.id == ship.id);
        const skin = shipSkins.find(s => s.id == stats.skin_id);

        // We can assign mixins using Object.assign for shared properties
        // Useful for applying things directly to this class
        Object.assign(this, new ShipMixin({
            ship,
            group,
            stats,
            skin,
            retrofits: shipRetrofits,
            blueprints: shipBlueprints
        }));

        // Assign a property directly to be included in serialization
        this.ammoCount = ship.ammo;
        this.armorType = SHIP_ARMOR_TYPE[stats.armor_type];

        this.equipment = Object.keys(ship)
            .filter(key => /equip_\d/.test(key))
            .reduce((obj, key, idx) => {
                const slot = idx + 1;
                obj[slot] = {};
                obj[slot].types = ship[key].map(type => EQUIPMENT_TYPE[type]);

                if (stats.equipment_proficiency[idx])
                    obj[slot].proficiency = stats.equipment_proficiency[idx];

                return obj;
            }, {});

        this.attributes = Object.entries(SHIP_ATTR_TYPE)
            .reduce((obj, entry) => {
                const [key, val] = entry;
                obj[val] = stats.attrs[parseInt(key)];
                return obj;
            }, { oxy: ship.oxy_max });

        this.skills = shipSkills
            .filter(skill => ship.buff_list.includes(skill.id))
            .map(skill => new ShipSkillMixin(skill));

        this.breakouts = shipBreakouts
            .filter(b => ships.filter(s => s.group_type == this._groupId)
                .map(s => s.id).includes(b.id))
            .map(b => {
                return {
                    description: (b.breakout_view != "N/A")
                        ? b.breakout_view.replace(/\//g, " / ")
                        : b.breakout_view,
                    cost: {
                        gold: b.use_gold,
                        ship: b.use_char_num
                    }
                };
            });

        this.skins = shipSkins
            .filter(s => s.ship_group == this._groupId)
            .map(s => new ShipSkinMixin(s));

        Object.assign(this, new ShipAcquisitionMixin(group.description));
    }
}

module.exports = Ship;