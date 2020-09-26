import DropItem from "../items/model.item.drop";
import RequestError from "lib/requestError";
import ShareCfgModel from "../model.sharecfg.base";

type MonthData = { [key: number]: { count: number, Item: DropItem } };

@ShareCfgModel.dependsOn([ "monthlySignIn" ])
export default class MonthlySignIn extends ShareCfgModel {
    entries: MonthData[];
    month: number;
    days: MonthData

    constructor(month: number = undefined) {
        super();

        if (month !== undefined && month < 12 && month > 1)
            throw new RequestError(400, "Month must be within 1 - 12");

        this.month = month;
    }

    async load(monthly: any[]) {
        if (this.month) {
            const month = monthly.find(m => m.id == this.month);
            this.days = formatMonth(month);
        } else {
            this.entries = monthly.map(m => formatMonth(m));
        }
    }
}

function formatMonth(month) {
    return Object.keys(month)
        .filter(k => /day(\d+)/.test(k))
        .reduce((obj, val, index) => {
            const [[type, id, count]] = month[val];
            obj[index] = {
                count,
                item: new DropItem(id, type)
            };
            return obj;
        }, {});
}