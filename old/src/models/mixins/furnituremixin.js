const ItemMixin = require("./itemmixin");

class FurnitureMixin extends ItemMixin {
    constructor(data) {
        super(data);
        this.description = data.describe;
        this.type = data.type;
    }
}

module.exports = FurnitureMixin;