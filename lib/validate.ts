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

import * as joiful from "joiful";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export interface QueriedNextApiRequest<T extends {}> extends NextApiRequest {
    body: T,
}

export type QueriedNextApiHandler<T> = (req: QueriedNextApiRequest<T>, res: NextApiResponse) => void | Promise<void>;

export enum ValidationTarget {
    Body = "body",
    Query = "query"
}

function validate<T>(
    schema: new(...args: any[]) => T,
    handle: QueriedNextApiHandler<T>,
    target = ValidationTarget.Query
) : NextApiHandler {
    return function (req, res) {
        const { error, value } = joiful.validateAsClass(req[target], schema);
        req.body = value;

        if (!error)
            return handle(req, res);

        res.status(400).json({ code: 400, message: error.message });
    };
}

export default validate;