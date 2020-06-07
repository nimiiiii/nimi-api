const Model = require("./base");
const PlayerResourceMixin = require("./mixins/shipmixin");

class ResourceList extends Model {
    async load(itemPlayerResources) {
        this.entries = itemPlayerResources.map(res => new PlayerResourceMixin(res));
    }
}

module.exports = ResourceList;