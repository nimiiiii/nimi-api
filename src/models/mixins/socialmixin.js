class SocialMixin {
    constructor(data, npcs, groups, lang) {
        this.name = data.name;
        this.icon = data.sculpture;
        this.post = lang[data.message_persist] ? lang[data.message_persist].value : undefined;
        this.picture = data.picture_persist;

        this.replies = data.npc_discuss_persist ? data.npc_discuss_persist.map(id => {
            const reply = npcs.find(n => n.id == id);
            const owner = groups.find(g => g.ship_group == reply.ship_group);

            return {
                name: owner.name,
                icon: owner.sculpture,
                post: lang[reply.message_persist] ? lang[reply.message_persist].value : undefined,
                replies: reply.npc_reply_persist ? reply.npc_reply_persist.map(id => {
                    const reply = npcs.find(n => n.id == id);
                    const owner = groups.find(g => g.ship_group == reply.ship_group);

                    return {
                        name: owner.name,
                        icon: owner.sculpture,
                        post: lang[reply.message_persist]
                            ? lang[reply.message_persist].value
                            : undefined
                    };
                }) : undefined
            };
        }) : undefined;
    }
}

module.exports = SocialMixin;