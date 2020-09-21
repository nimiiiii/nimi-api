const Endpoint = require("../../endpoint");
const SharedCfgRemote = require("../../remote/sharecfgremote");
const Task = require("../../models/task");

class TaskDetailEndpoint extends Endpoint {
    constructor() {
        super("/:taskId(\\d+)", SharedCfgRemote);
    }

    async action(req) {
        const { taskId } = req.params;

        return new Task(parseInt(taskId));
    }
}

module.exports = TaskDetailEndpoint;