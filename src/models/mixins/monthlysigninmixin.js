const DropItemMixin = require("./dropitemmixin");

class MonthlySignInMixin {
    constructor(data, { ships, stats, groups, skins, items, equipStats, resources, furniture }) {
        this.month = data.id;
        this.days = Object.keys(data)
            .filter(k => /day(\d+)/.test(k))
            .reduce((obj, val, idx) => {
                const [[type, id, count]] = data[val];
                obj[idx] = {
                    count,
                    data: new DropItemMixin(type, id, {
                        ships,
                        stats,
                        groups,
                        skins,
                        items,
                        equipStats,
                        resources,
                        furniture
                    })
                };
                return obj;
            }, {});
    }
}

module.exports = MonthlySignInMixin;