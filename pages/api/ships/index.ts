import ShipList from "lib/models/ships/model.ship.list";
import getResolver from "lib/getResolver";
import methods from "lib/methods";

export default methods({
    get: async (_, res) =>
        res.status(200).json(await new ShipList().run(await getResolver()))
});
