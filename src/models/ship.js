const ShipListItem = require("./shiplistitem");
const { SHIP_ATTR_TYPE } = require("../util/constants");

class Ship extends ShipListItem {
    constructor(data, stat, group) {
        super(data, stat, group);

        this.attributes = Object.entries(SHIP_ATTR_TYPE)
            .reduce((acc, cur) => {
                const [ key, value ] = cur;
                acc[value] = stat.attrs[parseInt(key)];

                return acc;
            }, {}),

        this.equipment = Object.keys(data)
            .filter(key => /equip_\d/.test(key))
            .reduce((acc, cur, idx) => {
                const slot = `slot-${idx}`;
                acc[slot] = {};
                acc[slot].types = data[cur];

                if (idx < 4)
                    acc[slot].proficiency = stat.equipment_proficiency[idx];

                return acc;
            }, {});
    }
}

module.exports = Ship;