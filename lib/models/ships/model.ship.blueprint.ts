/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import Item from "../items/model.item";
import Model from "../model.base";
import RequestError from "lib/requestError";
import ShareCfgModel from "../model.sharecfg.base";
import Skill from "../shared/model.skill";
import Task from "../shared/model.task";

@ShareCfgModel.dependsOn([ "shipBlueprints" ])
export default class ShipBlueprint extends ShareCfgModel {
    @Model.exclude()
    groupId: number;

    name: string;
    description: string;
    dungeonId: number;
    blueprint: Item;
    skills: { from: Skill, to: Skill }[];
    prerequisite: Task;
    tasks: { delay: number, task: Task }

    constructor(groupId: number) {
        super();

        this.groupId = groupId;
    }

    async load(blueprints: any[]) {
        const blueprint = blueprints.find(b => b.id == this.groupId);

        if (!blueprint)
            throw new RequestError(404, `Ship Group (ID: ${this.groupId}) does not have blueprint data.`);

        this.name = blueprint.name;
        this.description = blueprint.unlock_word;
        this.dungeonId = blueprint.simulate_dungeon;

        this.blueprint = (blueprint.strengthen_item > 0) ? new Item(blueprint.strengthen_item) : undefined;

        this.skills = blueprint.change_skill.map(([from, to]) =>
            ({ from: new Skill(from), to: new Skill(to) })
        );

        this.prerequisite = new Task(blueprint.unlock_task_open_condition);
        this.tasks = blueprint.unlock_task.map(([id, opensIn]) =>
            ({
                delay: opensIn,
                task: new Task(id)
            })
        );
    }
}