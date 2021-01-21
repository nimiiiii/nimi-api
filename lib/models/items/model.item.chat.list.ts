/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import ChatBubble from "./model.item.chat";
import ShareCfgModelList from "../model.sharecfg.list.base";
import { dependsOn } from "../model.helpers";

@dependsOn([ "itemChatFrames" ])
export default class ChatBubbleList extends ShareCfgModelList<ChatBubble> {
    constructor() {
        super(ChatBubble);
    }
}