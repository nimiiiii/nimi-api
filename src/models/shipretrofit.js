const ShipRetrofitTaskMixin = require("./mixins/shipretrofittaskmixin");
const Model = require("./base");
const RequestError = require("../util/requesterror");

class ShipRetrofit extends Model {
    constructor(groupId) {
        super();

        this.groupId = groupId;
    }

    async load(items, shipSkills, shipRetrofits, shipRetrofitTasks) {
        const retrofit = shipRetrofits.find(r => r.group_id == this.groupId);

        if (!retrofit)
            throw new RequestError(404, "Ship does not have retrofit data.");

        this.nodes = retrofit.transform_list.map(col => {
            return col.map(entry => {
                const [row, id] = entry;
                return {
                    row,
                    task: new ShipRetrofitTaskMixin(
                        shipRetrofitTasks.find(t => t.id == id),
                        items,
                        shipSkills
                    )
                };
            });
        });
    }
}

module.exports = ShipRetrofit;