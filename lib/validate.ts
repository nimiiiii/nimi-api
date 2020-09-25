/*
 *  From: https://github.com/ClarityCafe/Aya
 *  Copyright (c) 2020 Ayane Satomi, Michael Mitchell, et al.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */

import Joi from "@hapi/joi";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

type Locations = "body" | "query";

interface ValidateOptions {
  schema: Joi.Schema;
  location?: Locations;
}

interface ValidatedNextApiRequestBody<TSchema> extends NextApiRequest {
  body: TSchema;
}

interface ValidatedNextApiRequestQuery<TSchema extends {}> extends NextApiRequest {
  query: TSchema;
}

type ValidatedNextApiRequest<TSchema, TLocation extends Locations> = TLocation extends "body"
  ? ValidatedNextApiRequestBody<TSchema>
  : ValidatedNextApiRequestQuery<TSchema>;

type ValidatedNextApiHandler<TSchema, TLocation extends Locations> = (
  req: ValidatedNextApiRequest<TSchema, TLocation>,
  res: NextApiResponse
) => void;

function validate<TSchema, TLocation extends Locations = "body">(
    { schema, location = "body" }: ValidateOptions,
    handler: ValidatedNextApiHandler<TSchema, TLocation>
) : NextApiHandler {
    return function (req, res) {
        const { error, value } = schema.validate(req[location]);
        req.body = value;

        if (!error)
            return handler(req as ValidatedNextApiRequest<TSchema, TLocation>, res);

        res.status(400).json({ code: 400, message: error.message });
    };
}

export default validate;