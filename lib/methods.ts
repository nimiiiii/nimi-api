/*
 *  From: https://github.com/ClarityCafe/Aya
 *
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

import * as cors from "cors";
import handleError from "./handleError";
import rateLimit from "express-rate-limit";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

async function runMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    fn: any
) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error)
                return reject(result);

            return resolve(result);
        });
    });
}

export default function methods(
    handlers: { [key: string]: NextApiHandler }
) : NextApiHandler {
    return async function (req, res) {
        await runMiddleware(req, res, rateLimit({ windowMs: 60 * 60 * 1000, max: 500 }));
        await runMiddleware(req, res, cors);

        const handle = handlers[req.method.toLowerCase()];

        if (typeof handle === "function")
            return handleError(handle)(req, res);

        res.status(405).json({ code: 405, message: "Method not available on this endpoint" });
    };
}