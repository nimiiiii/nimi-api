const Endpoint = require("../../endpoint");
const SharedCfgRemote = require("../../remote/sharecfgremote");
const TaskList = require("../../models/tasklist");

class TaskListingEndpoint extends Endpoint {
    constructor() {
        super("/", SharedCfgRemote);
    }

    async action() {
        return new TaskList();
    }
}

module.exports = TaskListingEndpoint;