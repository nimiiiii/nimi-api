/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import Directory from "../github/github.directory";
import { IFileSchema } from "lib/schemas";
import Model from "lib/models/model.base";
import Path from "path";
import Repository from "../github/github.repository";
import snappy from "snappy";
import util from "util";
import { createFileEntry, getFileEntry, updateFileEntry } from "lib/database";


const compress = util.promisify(snappy.compress);
const uncompress = util.promisify(snappy.uncompress);

export interface ResolverConstructor {
    new (lang: string, repo: Repository) : Resolver;
}

/**
 * The base class for all resolvers. Resolvers manage obtaining and caching files from the remote repository.
 */
export default abstract class Resolver {
    path: string;
    lang: string;
    repo: Repository;
    files: Directory;
    cache: Map<string, any>;

    /**
     * @param path The path relative from the repository's root
     * @param lang The language
     * @param repo The GitHub repository
     */
    constructor(path: string, lang: string, repo: Repository) {
        this.path = path;
        this.lang = lang;
        this.repo = repo;
        this.files = null;
        this.cache = new Map<string, any>();
    }

    get initialized() : boolean {
        return this.files !== null;
    }

    /**
     * Initializes this repository by loading the directory and retrieving its files
     */
    async init() : Promise<void> {
        this.files = await this.repo.getDirectory(
            Path.join(this.lang, this.path).replace(/\\/g, "/")
        );
    }

    /**
     * Resolves a model's loader method and passes back resolved values to its arguments
     * @param loader A model's loader method
     */
    abstract async resolve(model: Model) : Promise<any[]>

    /**
     * Retrieves a file from cache or downloads the file from the repository if it doesn't exist.
     * @param file The file name to retrieve.
     */
    async get(file: string) : Promise<any> {
        if (!this.initialized)
            throw new Error("Remote has not been initialized");

        const path = Path.join(this.lang, this.path, file).replace(/\\/g, "/");
        const remote = this.files.get(file);

        if (remote === undefined)
            throw new Error(`${path} is not a file or is not found.`);

        // First, check if we have the file cached in memory.
        if (this.cache.has(file))
            return this.cache.get(file);

        // If we don't have it, check if it is cached in our database.
        let cached : IFileSchema;
        try {
            cached = <IFileSchema>(await getFileEntry(file));
            if (cached.hash === remote.sha) {
                const data = <string>(await uncompress(cached.contents, { asBuffer: false }));
                this.cache.set(file, data);
                return data;
            }
        } catch (error) {
            console.error(error);
        }

        // If we really don't have it or we have an outdated entry, obtain it from GitHub.
        const data = JSON.parse(await this.files.download(file));
        if (cached?.hash === undefined)
            createFileEntry(file, remote.sha, await compress(data));
        else
            updateFileEntry(file, remote.sha, await compress(data));

        this.cache.set(file, data);
        return data;
    }
}