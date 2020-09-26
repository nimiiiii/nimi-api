/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import RequestError from "lib/requestError";
import ShareCfgModel from "../model.sharecfg.base";

@ShareCfgModel.dependsOn([ "itemChatFrames" ])
export default class ChatBubble extends ShareCfgModel {
    id: number;
    name: string;
    description: string;

    constructor(id: number) {
        super();

        this.id = id;
    }

    async load(frames: any[]) {
        const frame = frames.find(f => f.id == this.id);

        if (!frame)
            throw new RequestError(404, `Frame (ID: ${this.id}) was not found.`);

        this.name = frame.name;
        this.description = frame.desc;
    }
}