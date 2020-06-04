const Endpoint = require("../../endpoint");
const ShipList = require("../../models/shiplist");
const SharedCfgRetriever = require("../../retrievers/sharecfgretriever");

class ShipIndexEndpoint extends Endpoint {
    constructor(repo) {
        super("/", new SharedCfgRetriever(repo));
    }

    async action() {
        this.add("ships", "ship_data_template.lua");
        this.add("stats", "ship_data_statistics.lua");
        this.add("groups", "ship_data_group.lua");

        const { ships, stats, groups } = await this.get();
        return new ShipList(ships, stats, groups);
    }
}

module.exports = ShipIndexEndpoint;