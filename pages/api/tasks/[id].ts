/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import Task from "lib/models/shared/model.task";
import methods from "lib/methods";
import validate from "lib/validate";
import { GetEntryByIdQuery, GetEntryByIdSchema } from "lib/schemas";

export default methods({
    get: validate<GetEntryByIdQuery, "query">(
        { schema: GetEntryByIdSchema, location: "query" },
        async (req, res) =>
            res.status(200).json(
                await new Task(req.body.id).run()
            )
    )
});