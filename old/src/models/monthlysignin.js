const Model = require("./base");
const MonthlySignInMixin = require("./mixins/monthlysigninmixin");

class MonthlySignIn extends Model {
    constructor(month) {
        super();

        this._month = month;
    }

    async load(monthlySignIn, ships, shipStats, shipGroups,
        shipSkins, items, itemPlayerResources, equipStats, furniture) {
        const month = monthlySignIn.find(m => m.id == this._month);

        const dependencies = {
            ships,
            items,
            furniture,
            equipStats,
            resources: itemPlayerResources,
            stats: shipStats,
            groups: shipGroups,
            skins: shipSkins
        };

        if (!month)
            this.entries = monthlySignIn.map(m => new MonthlySignInMixin(m, dependencies));
        else
            Object.assign(this, new MonthlySignInMixin(month, dependencies));
    }
}

module.exports = MonthlySignIn;