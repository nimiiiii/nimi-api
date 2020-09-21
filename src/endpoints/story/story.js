const Endpoint = require("../../endpoint");
const GameCfgRemote = require("../../remote/gamecfgremote");
const Story = require("../../models/story");

class StoryEndpoint extends Endpoint {
    constructor() {
        super("/:name", GameCfgRemote);
    }

    async action(req) {
        const { name } = req.params;

        return new Story(name.toLowerCase());
    }
}

module.exports = StoryEndpoint;