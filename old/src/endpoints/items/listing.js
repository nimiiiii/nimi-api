const Endpoint = require("../../endpoint");
const SharedCfgRemote = require("../../remote/sharecfgremote");
const ItemList = require("../../models/itemlist");

class ItemListingEndpoint extends Endpoint {
    constructor() {
        super("/", SharedCfgRemote);
    }

    async action() {
        return new ItemList();
    }
}

module.exports = ItemListingEndpoint;