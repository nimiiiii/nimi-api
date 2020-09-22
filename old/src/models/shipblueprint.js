const Model = require("./base");
const RequestError = require("../util/requesterror");
const TaskMixin = require("./mixins/taskmixin");
const ItemMixin = require("./mixins/itemmixin");
const SkillMixin = require("./mixins/skillmixin");
const { TAG_REGEX } = require("../util/constants");

class ShipBlueprint extends Model {
    constructor(groupId) {
        super();

        this.groupId = groupId;
    }

    async load(shipBlueprints, ships, shipStats, shipGroups,
        shipSkins, skills, tasks, items, itemPlayerResources) {
        const blueprint = shipBlueprints.find(b => b.id == this.groupId);

        if (!blueprint)
            throw new RequestError(404, "Ship blueprint is not found.");

        this.name = blueprint.name;
        this.description = blueprint.unlock_word.replace(TAG_REGEX, "");
        this.hasSimulation = (blueprint.simulate_dungeon > 0);

        const blueprintItem = items.find(i => i.id == blueprint.strengthen_item);
        this.blueprint = (blueprintItem)
            ? new ItemMixin(blueprintItem)
            : null;

        this.skills = blueprint.change_skill.map((entry) => {
            const [fromId, toId] = entry;

            const from = skills.find(s => s.id == fromId);
            const to = skills.find(s => s.id == toId);
            return {
                from: (from)
                    ? new SkillMixin(from)
                    : null,
                to: (to)
                    ? new SkillMixin(to)
                    : null
            };
        });

        const taskDependencies = {
            ships,
            items,
            groups: shipGroups,
            stats: shipStats,
            skins: shipSkins,
            resources: itemPlayerResources
        };

        const prereqTask = tasks.find(t => t.id == blueprint.unlock_task_open_condition);
        this.prerequisiteTask = new TaskMixin(prereqTask, taskDependencies);

        this.tasks = blueprint.unlock_task.map((entry) => {
            const [id, opensIn] = entry;
            const task = tasks.find(t => t.id == id);
            return {
                opensIn,
                data: (task)
                    ? new TaskMixin(task, taskDependencies)
                    : null
            };
        });
    }
}

module.exports = ShipBlueprint;