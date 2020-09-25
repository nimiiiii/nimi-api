import Joi from "@hapi/joi";
import Ship from "lib/models/ships/model.ship";
import getResolver from "lib/getResolver";
import methods from "lib/methods";
import validate from "lib/validate";

interface GetShipQuery {
    id: number,
    breakoutLevel: number
}

const GetShipSchema = Joi.object({
    id: Joi.number(),
    breakoutLevel: Joi.number().default(1)
});

export default methods({
    get: validate<GetShipQuery, "query">(
        { schema: GetShipSchema, location: "query" },
        async (req, res) =>
            res.status(200).json(
                await new Ship(req.body.id, req.body.breakoutLevel).run(await getResolver())
            )
    )
});