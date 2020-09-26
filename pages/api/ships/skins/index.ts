import ShipSkinList from "lib/models/ships/model.ship.skin.list";
import getResolver from "lib/getResolver";
import methods from "lib/methods";

export default methods({
    get: async (_, res) =>
        res.status(200).json(await new ShipSkinList().run(await getResolver()))
});
