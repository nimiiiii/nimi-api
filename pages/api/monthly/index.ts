
import MonthlySignIn from "lib/models/shared/model.monthly";
import getResolver from "lib/getResolver";
import methods from "lib/methods";

export default methods({
    get: async (_, res) =>
        res.status(200).json(await new MonthlySignIn().run(await getResolver()))
});
