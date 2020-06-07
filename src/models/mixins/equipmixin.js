const { EQUIPMENT_TYPE } = require("../../util/constants");

class EquipMixin {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.type = EQUIPMENT_TYPE[data.type];
        this.nation = data.nationality;
        this.description = data.descrip;
        this.assetName = data.icon;
    }
}

module.exports = EquipMixin;