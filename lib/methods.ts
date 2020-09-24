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

import Model from "./models/model.base";
import { NextApiHandler } from "next";
import Repository from "./github/github.repository";

// TODO: probably add CORS stuff as well
const methods = (methodHandlers: {
  // we can add method properties here later, for now we only have one method property which is run
  model: Model
}): NextApiHandler => async (req, res) => {
    // const method = req.method.toLowerCase();
    // const handler = methodHandlers[method];

    if (methodHandlers.model && methodHandlers.model instanceof Model) {
        const repo = new Repository(
            "",
            "nobbyfix",
            "AzurLaneSourceJson",
            "master"
        );

        const Resolver = (await import("./resolvers/modules/resolver.sharefcg.en")).default;
        const resolver = new Resolver(repo);
        await resolver.init();
        const data = await methodHandlers.model.run(resolver, true);
        res.status(200).json(data);
    }
    else {
        res
            .status(405)
            .json({ code: 405, message: "Method not available on this endpoint" });
    }
};

export default methods;
