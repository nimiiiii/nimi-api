/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import { GetEntryByIdQuery } from "lib/schemas";
import Joi from "@hapi/joi";
import Ship from "lib/models/ships/model.ship";
import getResolver from "lib/getResolver";
import methods from "lib/methods";
import validate from "lib/validate";

export interface GetShipQuery extends GetEntryByIdQuery {
    breakoutLevel: number
}

export const GetShipSchema = Joi.object({
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