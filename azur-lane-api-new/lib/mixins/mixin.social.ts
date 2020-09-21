export default class SocialMixin {
    name: string;
    icon: string;
    post: any;
    picture: any;
    replies: any;

    constructor(data: any, npcs: any, groups: any, lang: any) {
        this.name = data.name;
        this.icon = data.sculpture;
        this.post = lang[data.message_persist] ? lang[data.message_persist].value : undefined;
        this.picture = data.picture_persist;

        this.replies = data.npc_discuss_persist ? data.npc_discuss_persist.map(id => {
            let reply = npcs.find(n => n.id == id);
            let owner = groups.find(g => g.ship_group == reply.ship_group);

            return {
                name: owner.name,
                icon: owner.sculpture,
                post: lang[reply.message_persist] ? lang[reply.message_persist].value : undefined,
                replies: reply.npc_reply_persist ? reply.npc_reply_persist.map(id => {
                    let reply = npcs.find(n => n.id == id);
                    let owner = groups.find(g => g.ship_group == reply.ship_group);

                    return {
                        name: owner.name,
                        icon: owner.sculpture,
                        post: lang[reply.message_persist]
                              ? lang[reply.message_persist].value
                              : undefined
                    }
                }) : undefined
            }
        }) : undefined;
    }
}