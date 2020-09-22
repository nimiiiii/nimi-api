const Endpoint = require("../endpoint");
const SharedCfgRemote = require("../remote/sharecfgremote");
const MonthlySignIn = require("../models/monthlysignin");

class MonthlySignInEndpoint extends Endpoint {
    constructor() {
        super("/monthly/:month(1[0-2]|[1-9])?", SharedCfgRemote);
    }

    async action(req) {
        const { month } = req.params;

        return new MonthlySignIn(parseInt(month));
    }
}

module.exports = MonthlySignInEndpoint;