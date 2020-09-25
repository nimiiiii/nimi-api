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
