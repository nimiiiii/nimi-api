const Endpoint = require("../../endpoint");
const SharedCfgRetriever = require("../retrievers/sharecfgretriever");

class ShipIndexEndpoint extends Endpoint {
    constructor(repo) {
        super("/", new SharedCfgRetriever(repo));
    }

    async action() {
        this.add("ships", "ship_data_template.lua");
        this.add("stats", "ship_data_statistics.lua");
        this.add("groups", "ship_data_group.lua");

        const { ships, stats, groups } = await this.get();

        const entries = groups.map(group => {
            const ship = ships
                .filter(s => s.group_type == group.group_type)
                .sort((a, b) => a.star - b.star)[0];
            const stat = stats.find(s => s.id == ship.id);
            return {
                id: ship.id,
                group: group.group_type,
                name: stat.name,
                code: group.code,
                type: stat.type,
                rarity: stat.rarity - 1,
                nation: stat.nationality
            };
        });

        return { entries };
    }
}

module.exports = ShipIndexEndpoint;