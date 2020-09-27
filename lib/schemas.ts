/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import Joi from "@hapi/joi";
import mongoose from "mongoose";

/**
 * The valid schemas for Language strings. Note it only check ?lang= querysring so
 * if you're planning to check more than one argument, you will need a new Joi.object
 * to see what to expect in the request querystring.
 */
export const LangQueryStringSchema = Joi.string().valid("en", "jp", "tw", "cn", "kr");

export interface GetEntryByIdQuery {
    id: number;
}

export const GetEntryByIdSchema = Joi.object({
    id: Joi.number()
});


export const FileSchema = new mongoose.Model({
    name: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    contents: {
        type: Buffer,
        required: true
    }
});

/**
 * Interface that describes the model of a file entry in MongoDB
 */
export interface IFileSchema extends mongoose.Document {
    name: string,
    hash: string,
    contents: Buffer
}
