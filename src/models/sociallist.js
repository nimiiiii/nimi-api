const Model = require("./base");
const SocialMixin = require("./mixins/socialmixin");

class SocialList extends Model {
    async load(social, socialNpc, socialNpcGroup, lang) {
        this.entries = social.map(s => {
            return new SocialMixin(s, socialNpc, socialNpcGroup, lang);
        });
    }
}

module.exports = SocialList;