const SharedCfgRetriever = require("../retrievers/sharecfgretriever");
const Endpoint = require("../../endpoint");
const Ship = require("../../models/ship");

class ShipDetailEndpoint extends Endpoint {
    constructor(repo) {
        super("/:groupId(\\d+)", new SharedCfgRetriever(repo));
    }

    async action(req) {
        this.add("ships", "ship_data_template.lua");
        this.add("stats", "ship_data_statistics.lua");
        this.add("groups", "ship_data_group.lua");

        const { groupId } = req.params;
        const { ships, stats, groups } = await this.get();

        const group = groups.find(g => g.group_type == groupId);
        const ship = ships.find(s => s.group_type == groupId);
        const stat = stats.find(s => s.id == ship.id);

        return new Ship(ship, stat, group);
    }
}

module.exports = ShipDetailEndpoint;