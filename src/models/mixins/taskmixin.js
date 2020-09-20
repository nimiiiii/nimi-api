const DropItemMixin = require("./dropitemmixin");
const ItemMixin = require("./itemmixin");
const { TAG_REGEX } = require("../../util/constants");

class TaskMixin {
    constructor(data, { ships, groups, stats, skins, items, resources }) {
        this.id = data.id;

        this.type = data.type;
        this.name = data.name;
        this.description = data.desc.replace(TAG_REGEX, "");
        this.minLevel = data.level;
        this.nextTask = (data.next_task != 0) ? data.next_task : null;

        this.scenario = (data.story_id.length > 0 && data.scene.length > 0)
            ? { id: data.story_id, background: data.scene }
            : null;

        const consumeItem = items.find(i => i.id == data.target_id_for_client);
        this.consumeItem = (consumeItem)
            ? { count: data.target_num, data: new ItemMixin(consumeItem) }
            : null;

        this.rewards = data.award_display.map((entry) => {
            let [type, id, count] = entry;

            return {
                count,
                data: new DropItemMixin(type, id, {
                    ships,
                    stats,
                    skins,
                    groups,
                    items,
                    resources
                })
            };
        });
    }
}

module.exports = TaskMixin;