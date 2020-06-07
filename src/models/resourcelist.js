const Model = require("./base");
const PlayerResourceMixin = require("./mixins/playerresourcemixin");

class ResourceList extends Model {
    async load(items, itemPlayerResources) {
        this.entries = itemPlayerResources.map(res => new PlayerResourceMixin(res, items));
    }
}

module.exports = ResourceList;