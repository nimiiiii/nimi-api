/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import DropItem from "../items/model.item.drop";
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