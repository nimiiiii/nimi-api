/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import RequestError from "lib/requestError";
import ShareCfgModel from "../model.sharecfg.base";

interface JuustagramPost {
    name: string,
    icon: string,
    post: string,
    picture: string,
    replies: JuustagramPost[]
}

@ShareCfgModel.dependsOn([ "social", "socialNpc", "socialNpcGroup", "lang" ])
export default class Post extends ShareCfgModel implements JuustagramPost {
    id: number;
    name: string;
    icon: string;
    post: string;
    picture: string;
    replies: JuustagramPost[];

    constructor(id: number) {
        super();

        this.id = id;
    }

    async load(posts: any[], npcs: any[], groups: any[], lang: any) {
        const post = posts.find(p => p.id == this.id);

        if (!post)
            throw new RequestError(404, `Juustagram Post (ID: ${this.id}) is not found.`);

        this.name = post.name;
        this.icon = post.sculpture;
        this.post = lang[post.message_persist]?.value;
        this.picture = post.picture_persist;

        this.replies = post.npc_discuss_persist?.map(id => {
            const reply = npcs.find(n => n.id == id);
            const owner = groups.find(g => g.ship_group == reply.ship_group);

            return {
                name: owner.name,
                icon: owner.sculpture,
                post: lang[reply.message_persist]?.value,
                replies: reply.npc_reply_persist?.map(id => {
                    const reply = npcs.find(n => n.id == id);
                    const owner = groups.find(g => g.ship_group == reply.ship_group);

                    return {
                        name: owner.name,
                        icon: owner.sculpture,
                        post: lang[reply.message_persist]?.value
                    };
                })
            };
        });
    }
}