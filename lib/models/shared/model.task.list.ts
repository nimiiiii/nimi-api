/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import ShareCfgModel from "../model.sharecfg.base";
import ShareCfgModelList from "../model.sharecfg.list.base";
import Task from "./model.task";

@ShareCfgModel.dependsOn([ "tasks" ])
export default class TaskList extends ShareCfgModelList<Task> {
    async load(tasks: any[]) {
        this.entries = tasks.map(s => new Task(s.id));
    }
}