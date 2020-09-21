const DropItemMixin = require("./dropitemmixin");
const ItemMixin = require("./itemmixin");
const { TAG_REGEX } = require("../../util/constants");

class TaskMixin {
    constructor(data, { ships, groups, stats, skins, items, resources, equipStats, furniture }) {
        this.id = data.id;

        this.type = data.type;
        this.subType = data.sub_type;
        this.name = data.name;
        this.description = data.desc ? data.desc.replace(TAG_REGEX, "") : null;
        this.minLevel = data.level;
        this.nextTask = (data.next_task != 0) ? data.next_task : null;

        this.storyId = data.storyId ? data.storyId : null;

        const consumeItem = data.target_id_for_client
            ? items.find(i => i.id == data.target_id_for_client)
            : undefined;

        this.consumeItem = (consumeItem)
            ? { count: data.target_num, data: new ItemMixin(consumeItem) }
            : null;

        // TODO: Some values are in string (why?)
        this.rewards = !Array.isArray(data.award_display)
            ? []
            : data.award_display.map((entry) => {
                let [type, id, count] = entry;

                return {
                    count,
                    data: new DropItemMixin(type, id, {
                        ships,
                        stats,
                        skins,
                        groups,
                        items,
                        resources,
                        equipStats,
                        furniture
                    })
                };
            });
    }
}

module.exports = TaskMixin;