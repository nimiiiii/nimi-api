const Endpoint = require("../../endpoint");
const SharedCfgRemote = require("../../remote/sharecfgremote");
const EquipList = require("../../models/equiplist");

class EquipListingEndpoint extends Endpoint {
    constructor() {
        super("/", SharedCfgRemote);
    }

    async action() {
        return new EquipList();
    }
}

module.exports = EquipListingEndpoint;