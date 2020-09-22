const Model = require("./base");
const TaskMixin = require("./mixins/taskmixin");

class Task extends Model {
    constructor(taskId) {
        super();

        this._taskId = taskId;
    }

    async load(tasks, ships, items, shipGroups, shipStats,
        shipSkins, itemPlayerResources, furniture, equipStats) {
        const taskDependencies = {
            ships,
            items,
            furniture,
            equipStats,
            groups: shipGroups,
            stats: shipStats,
            skins: shipSkins,
            resources: itemPlayerResources
        };

        const task = tasks.find(t => t.id == this._taskId);
        Object.assign(this, new TaskMixin(task, taskDependencies));
    }
}

module.exports = Task;