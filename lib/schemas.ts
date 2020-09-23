import Joi from "@hapi/joi";

/**
 * The valid schemas for Language strings. Note it only check ?lang= querysring so
 * if you're planning to check more than one argument, you will need a new Joi.object
 * to see what to expect in the request querystring.
 */
export const LangQueryStringSchema = Joi.string().valid("en", "jp", "tw", "cn", "kr");

