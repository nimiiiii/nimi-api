const Model = require("./base");
const RequestError = require("../util/requesterror");
const ItemMixin = require("./mixins/itemmixin");

class Item extends Model {
    constructor(itemId) {
        super();

        this._itemId = itemId;
    }

    async load(items) {
        const item = items.find(i => i.id == this._itemId);

        if (!item)
            throw new RequestError(404, "Item not found.");

        Object.assign(this, new ItemMixin(item));
    }
}

module.exports = Item;