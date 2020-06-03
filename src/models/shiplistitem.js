const Model = require("./base");

class ShipListItem extends Model {
    constructor(data, stat, group) {
        super();

        this.id = data.id;
        this.group = group.group_type;
        this.name = stat.name;
        this.code = group.code;
        this.type = stat.type;
        this.rarity = stat.rarity - 1;
        this.nation = stat.nationality;
    }
}

module.exports = ShipListItem;