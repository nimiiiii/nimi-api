import ShipSkinList from "lib/models/ships/model.ship.skin.list";
import getResolver from "lib/getResolver";
import methods from "lib/methods";
import validate from "lib/validate";
import { GetShipQuery, GetShipSchema } from ".";

export default methods({
    get: validate<GetShipQuery, "query">(
        { schema: GetShipSchema, location: "query" },
        async (req, res) =>
            res.status(200).json(
                await new ShipSkinList(req.body.id).run(await getResolver())
            )
    )
});