import Joi from "@hapi/joi";
import ShipSkin from "lib/models/ships/model.ship.skin";
import getResolver from "lib/getResolver";
import methods from "lib/methods";
import validate from "lib/validate";

interface GetShipSkinQuery {
    id: number;
}

const GetShipSkinSchema = Joi.object({
    id: Joi.number()
});

export default methods({
    get: validate<GetShipSkinQuery, "query">(
        { schema: GetShipSkinSchema, location: "query" },
        async (req, res) =>
            res.status(200).json(
                await new ShipSkin(req.body.id).run(await getResolver())
            )
    )
});