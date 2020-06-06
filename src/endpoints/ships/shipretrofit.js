const Endpoint = require("../../endpoint");
const SharedCfgRemote = require("../../remote/sharecfgremote");
const ShipRetrofit = require("../../models/shipretrofit");

class ShipRetrofitEndpoint extends Endpoint {
    constructor() {
        super("/:groupId/retrofit", SharedCfgRemote);
    }

    async action(req) {
        const { groupId } = req.params;

        return new ShipRetrofit(parseInt(groupId));
    }
}

module.exports = ShipRetrofitEndpoint;