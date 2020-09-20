class EquipMixin {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        this.nation = data.nationality;
        this.description = data.descrip;
        this.assetName = data.icon;
    }
}

module.exports = EquipMixin;