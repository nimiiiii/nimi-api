const Model = require("./base");
const ItemMixin = require("./mixins/itemmixin");

class ItemList extends Model {
    async load(items) {
        this.entries = items.map(item => new ItemMixin(item));
    }
}

module.exports = ItemList;