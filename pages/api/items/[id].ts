/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import Item from "lib/models/items/model.item";
import getResolver from "lib/getResolver";
import methods from "lib/methods";
import validate from "lib/validate";
import { GetEntryByIdQuery, GetEntryByIdSchema } from "lib/schemas";

export default methods({
    get: validate<GetEntryByIdQuery, "query">(
        { schema: GetEntryByIdSchema, location: "query" },
        async (req, res) =>
            res.status(200).json(
                await new Item(req.body.id).run(await getResolver())
            )
    )
});