import Joi from "@hapi/joi";
import MonthlySignIn from "lib/models/shared/model.monthly";
import getResolver from "lib/getResolver";
import methods from "lib/methods";
import validate from "lib/validate";

interface GetMonthQuery {
    month: number
}

const GetMonthSchema= Joi.object({
    month: Joi.number()
});

export default methods({
    get: validate<GetMonthQuery, "query">(
        { schema: GetMonthSchema, location: "query" },
        async (req, res) =>
            res.status(200).json(
                await new MonthlySignIn(req.body.month).run(await getResolver())
            )
    )
});