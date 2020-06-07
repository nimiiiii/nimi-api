const Model = require("./base");
const RequestError = require("../util/requesterror");
const PlayerResourceMixin = require("./mixins/playerresourcemixin");

class Resource extends Model {
    constructor(resId) {
        super();

        this._resId = resId;
    }

    async load(itemPlayerResources) {
        const res = itemPlayerResources.find(i => i.id == this._resId);

        if (!res)
            throw new RequestError(404, "Resource not found.");

        Object.assign(this, new PlayerResourceMixin(res));
    }
}

module.exports = Resource;