const Model = require("./base");
const SocialMixin = require("./mixins/socialmixin");

class Social extends Model {
    constructor(postId) {
        super();

        this._postId = postId;
    }

    async load(social, socialNpc, socialNpcGroup, lang) {
        const post = social.find(s => s.id == this._postId);

        Object.apply(this, new SocialMixin(post, socialNpc, socialNpcGroup, lang));
    }
}

module.exports = Social;