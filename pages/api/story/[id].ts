/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import Joi from "@hapi/joi";
import Story from "lib/models/gamecfg/model..story";
import methods from "lib/methods";
import validate from "lib/validate";

interface GetFileByIdQuery {
    id: string;
}

const GetFileByIdSchema = Joi.object({
    id: Joi.string()
});

export default methods({
    get: validate<GetFileByIdQuery, "query">(
        { schema: GetFileByIdSchema, location: "query" },
        async (req, res) =>
            res.status(200).json(
                await new Story(req.body.id).run()
            )
    )
});