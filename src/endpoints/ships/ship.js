const SharedCfgRetriever = require("../../retrievers/sharecfgretriever");
const Endpoint = require("../../endpoint");
const Ship = require("../../models/ship");

class ShipDetailEndpoint extends Endpoint {
    constructor(repo) {
        super("/:groupId(\\d+)", new SharedCfgRetriever(repo));
    }

    async action(req) {
        this.add("ships", "ship_data_template.lua");
        this.add("stats", "ship_data_statistics.lua");
        this.add("skins", "ship_skin_template.lua");
        this.add("groups", "ship_data_group.lua");
        this.add("skills", "skill_data_template.lua");

        const { groupId } = req.params;
        const { breakoutId } = req.query;
        const { ships, stats, groups, skins, skills } = await this.get();

        const ship = ships.filter(s => s.group_type == groupId)
            .reverse()[(breakoutId) ? parseInt(breakoutId) - 1 : 0];

        const group = groups.find(g => g.group_type == groupId);
        const skill = skills.filter(s => ship.buff_list_display.includes(s.id));

        const stat = stats.find(s => s.id == ship.id);
        const skin = skins.filter(s => s.ship_group == groupId);

        return new Ship(ship, stat, group, skin, skill);
    }
}

module.exports = ShipDetailEndpoint;