/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import * as joiful from "joiful";
import { SCHEMA_POSITION_KEY } from "./constants";

/**
 * The valid schema for language strings. Note it only check `?region=` querystring.
 * Use this schema when interacting with models.
 */
export class GetEntryByRegionQuery {
    @joiful.string().valid("en", "jp", "tw", "cn", "kr").optional().default("en")
    @position(Number.MAX_VALUE)
    region?: string;
}

/**
 * The valid schema for models that require to be searched by its numeric id.
 */
export class GetEntryByIdQuery extends GetEntryByRegionQuery {
    @joiful.number().required()
    @position(Number.MIN_VALUE)
    id!: number;
}

/**
 * The valid schema for models that require to be searched by its file name.
 */
export class GetFileByIdQuery extends GetEntryByRegionQuery {
    @joiful.string().required()
    @position(Number.MIN_VALUE)
    id!: string;
}

/**
 * Define what position this property wille be ordered in the schema.
 * @param order The position of the property in the schema.
 */
export function position(order: number) {
    return function(target: any, propertyKey: string) {
        Reflect.defineMetadata(SCHEMA_POSITION_KEY, order, target, propertyKey);
    };
}
