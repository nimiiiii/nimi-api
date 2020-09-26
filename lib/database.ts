
/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */

import Base from "./entities/Base";
import File from "./entities/File";
import { FileEntry } from "./schemas";
import { getConnection } from "typeorm";



const query = () => getConnection().createQueryBuilder();
const getOneOfType = <T extends typeof Base>(type: T) => (id: string) =>
    type.findOneOrFail({ id });


/**
 * Creates a file entry on the database.
 * @param id the identifier for the file entry, this must be a SHA of the file.
 * @param file a gzippped buffer of the file.
 */
export const createFileEntry = async({ id, file }: FileEntry) => {
    await query()
        .insert()
        .into(File)
        .values([{ id, file }])
        .execute();
};

/**
 * Updates a file entry on the database. It's more than likely you need to do this often if the source file
 * Needs to be updated because there's a new version of it somewhere.
 * @param id the identifier of the file entry. this must be a SHA of the file.
 * @param file a gzipped buffer of the file.
 */
export const updateFileEntry = async({ id, file }: FileEntry) => {
    // using repository is wack so we're using Query builder instead.
    await query()
        .update(File)
        .set({ file })
        .where("id = :id", { id })
        .execute();
};

/**
 * gets a file entry from the database, note that you have to cast the type if it's a different type than expected.
 * @example
 * await getFileEntry(id as string)
 */
export const getFileEntry = getOneOfType(File);