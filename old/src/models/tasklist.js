const Model = require("./base");
const TaskMixin = require("./mixins/taskmixin");

class TaskList extends Model {
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

        this.entries = tasks.map(t => {
            return new TaskMixin(t, taskDependencies);
        });
    }
}

module.exports = TaskList;