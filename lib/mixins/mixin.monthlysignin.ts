import DropItemMixin from "./mixin.dropitem";

export default class MonthlySignInMixin {
    month: number;
    days: {};

    constructor(data, { ships, stats, groups, skins, items, 
                              equipStats, resources, furniture}) {
        this.month = data.id;
        this.days = Object.keys(data)
                    .filter(k => /day(\d+)/.test(k))
                    .reduce((o, v, i) => {

                        let [[type, id, cnt]] = data[v];

                        o[i] = {
                            cnt,
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
                        return o;
                    }, {})

    }
}