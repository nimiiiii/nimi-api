const ItemMixin = require("./itemmixin");

class PlayerResourceMixin {
    constructor(data, items) {
        this.id = data.id;
        this.name = data.name;

        const item = items.find(i => i.id == data.itemid);
        this.item = (item) ? new ItemMixin(item) : null;
    }
}

module.exports = PlayerResourceMixin;