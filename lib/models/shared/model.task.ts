import DropItem from "../items/model.item.drop";
import Item from "../items/model.item";
import RequestError from "lib/requestError";
import ShareCfgModel from "../model.sharecfg.base";

@ShareCfgModel.dependsOn([ "tasks" ])
export default class Task extends ShareCfgModel {
    id: number;
    type: number;
    subType: number;
    name: string;
    description: string;
    minLevel: number;
    nextTaskId: number;
    storyId: number;
    consume: Item;
    rewards: { count: number, item: DropItem }[]

    constructor(id: number) {
        super();

        this.id = id;
    }

    async load(tasks: any[]) {
        const task = tasks.find(t => t.id == this.id);

        if (!task)
            throw new RequestError(404, `Task (ID: ${this.id}) is not found.`);

        this.type = task.type;
        this.subType = task.sub_type;
        this.name = task.name;
        this.description = task.desc;
        this.minLevel = task.level;
        this.nextTaskId = task.next_task;
        this.storyId = task.storyId;

        this.consume = (task.target_id_for_client > 0) ? new Item(task.target_id_for_client) : undefined;

        // TODO: Parse Lua Strings (for some reason they are)
        this.rewards = Array.isArray(task.award_display)
            ? task.award_display.map(([type, id, count]) =>
                ({
                    count,
                    item: new DropItem(id, type)
                })
            )
            : [];
    }
}