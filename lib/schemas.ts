/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import Joi from "@hapi/joi";

/**
 * The valid schemas for Language strings. Note it only check ?lang= querysring so
 * if you're planning to check more than one argument, you will need a new Joi.object
 * to see what to expect in the request querystring.
 */
export const langQueryStringSchema = Joi.string().valid("en", "jp", "tw", "cn", "kr");

/**
 * The expected values for the ship endpoint.
 */
export interface getShipQuery {
    groupId?: number,
    breakoutLevel?: number
}

/**
 * Validation schema for the ship endpoint queries.
 */
export const getShipQuerySchema = Joi.object({
    groupId: Joi.number().optional(),
    breakoutLevel: Joi.number().optional()
});


/**
 * Represents a file entry structure in the database.
 */
export interface FileEntry {
    id: string;
    file: Buffer;
}
