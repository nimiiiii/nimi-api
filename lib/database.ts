/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import mongoose from "mongoose";
import { FileSchema, IFileSchema } from "./schemas";


const FileModel = mongoose.model<IFileSchema>("File", FileSchema);
const connectDB = async () => mongoose.connect(process.env.NIMI_MONGODB_HOST ||
    "mongodb://localhost:27017", { useNewUrlParser: true });


/**
 * Creates a new file entry in the database.
 * @param name the name of the file 
 * @param hash  the hash identifier of the file, grab this from GitHub.
 * @param contents the buffered contents of the file. Recommended to use GZipped buffers here.
 */
export async function createFileEntry(name: string, hash: string, contents: Buffer): Promise<void> {
    await connectDB();
    const File = new FileModel({ name, hash, contents });

    try {
        await File.save();
    } catch (e) {
        throw new Error(e);
    }
}

/**
 * Updates a existing file entry in the database. Usually needed if the files has a new version somewhere.
 * @param name the name of the file. This needs to be consistent as this is used as a search term to the DB.
 * @param hash the new hash identifier of the file. New versions of the file gets a new hash so you want to update this.
 * @param contents the new (GZipped) buffered contents of the files.
 */
export async function updateFileEntry(name: string, hash:string, contents: Buffer): Promise<void> {
    await connectDB();
    const File: typeof FileModel = FileModel;

    try {
        const entry = await File.findOne({ name });

        entry.update({}, { hash, contents });
        entry.save();
    } catch (e) {
        throw new Error(e);
    }
}

/**
 * Gets a file entry from the DB and returns the entry as a JavaScript object.
 * @param name the name of the file.
 * @returns the JavaScript object. This also contains the document id (_id). This is a instance of IFileModel as object.
 */
export async function getFileEntry(name: string): Promise<object> {
    await connectDB();
    const File: typeof FileModel = FileModel;

    try {
        const entry: IFileSchema = await File.findOne({ name });

        return entry.toObject;
    } catch (e) {
        throw new Error(e);
    }
}

/**
 * Deletes a file entry in the database. Useful if the file is deprecated on new versions of the file sets.
 * @param name the name of the file to remove.
 */
export async function deleteFileEntry(name: string) {
    await connectDB();
    const File: typeof FileModel = FileModel;

    try {
        await File.findByIdAndDelete({ name });
    } catch (e) {
        throw new Error(e);
    }
}