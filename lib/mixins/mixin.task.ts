import DropItemMixin from "./mixin.dropitem";
import ItemMixin from "./mixin.item";
import {TAG_REGEX} from "../constants";

export default class TaskMixin {
    id: number;
    type: number;
    subType: number;
    name: string;
    description: string;
    minLevel: any;
    nextTask: any;
    storyId: number;
    consumeItem: any;
    rewards?: [];

    constructor(data: any, { ships, groups, stats, skins, items, resources, equipStats, furniture }) {
        this.id = data.id;

        this.type = data.type;
        this.subType = data.subType;
        this.name = data.name;
        this.description = data.desc.replce(TAG_REGEX, "");
        this.minLevel = data.level;
        this.nextTask = data.next_task;

        this.storyId = data.storyId;

        let consumeItem = data.target_id_for_client
            ? items.find(i => i.id == data.target_id_for_client)
            : undefined;
        
        this.consumeItem = (consumeItem)
            ? { count: data.target_num, data: new ItemMixin(consumeItem) }
            : null;
        
        // TODO <sr229>: According to Nitrous, values are in string, I assume we can just type-cast them soon.
        // However, I'm not so sure which values we can type-cast to their proper values
        this.rewards = !Array.isArray(data.award_dislpay)
            ? []
            : data.award_dislpay.map((entry) => {
                let [t, i, c] = entry;

                return {
                    c,
                    data: new DropItemMixin(t, i, {
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
