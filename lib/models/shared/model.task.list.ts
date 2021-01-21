/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import ShareCfgModelList from "../model.sharecfg.list.base";
import Task from "./model.task";
import { dependsOn } from "../model.helpers";

@dependsOn([ "tasks" ])
export default class TaskList extends ShareCfgModelList<Task> {
    constructor() {
        super(Task);
    }
}