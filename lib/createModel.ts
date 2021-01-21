/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import { GetEntryByRegionQuery } from "./schemas";
import { IModel } from "./models/model.base";
import { ResolverRegion } from "./resolvers/resolver.base";
import { SCHEMA_POSITION_KEY } from "./constants";
import methods from "./methods";
import { NextApiHandler, NextApiResponse } from "next";
import validate, { QueriedNextApiRequest } from "./validate";

type Newable<T> = new (...args: any[]) => T;

function validateAction(schema: Newable<Object>, model: Newable<IModel>) : NextApiHandler {
    return async function (req: QueriedNextApiRequest<GetEntryByRegionQuery>, res: NextApiResponse) {
        const order = Object.keys(req.body)
            .map(k => [ k, Reflect.getMetadata(SCHEMA_POSITION_KEY, new schema(), k) ?? 0 ]);
        const args = order.sort((a, b) => a[1] - b[1]).map(e => req.body[e[0]]);

        // In the default schema structure, "region" has the value Number.MAX_VALUE.
        // This means region identifier will always be at the end of the array.
        const region : ResolverRegion = args.pop();

        const instance = new model(...args);
        instance.setResolverDefaults(process.env.GITHUB_TOKEN, process.env.REMOTE_REPO, region);

        const serialized = await instance.run();
        res.status(200).json(serialized);
    };
}

/**
 * A factory method that creates a `NextApiHandler` using the provided model and schema.
 * @param model The model to be used in serialization.
 * @param schema The model's argument as a schema that will be passed during its initialization.
 */
export default function createModel(
    model: Newable<IModel>,
    schema: Newable<Object> = GetEntryByRegionQuery
) {
    return methods({ get: validate(schema, validateAction(schema, model)) });
}