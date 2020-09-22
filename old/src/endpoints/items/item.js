const Endpoint = require("../../endpoint");
const SharedCfgRemote = require("../../remote/sharecfgremote");
const Item = require("../../models/item");

class ItemDetailEndpoint extends Endpoint {
    constructor() {
        super("/:itemId(\\d+)", SharedCfgRemote);
    }

    async action(req) {
        const { itemId } = req.params;

        return new Item(parseInt(itemId));
    }
}

module.exports = ItemDetailEndpoint;