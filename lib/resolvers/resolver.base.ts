/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import Directory from "../github/github.directory";
import Model from "lib/models/model.base";
import Path from "path";
import Repository from "../github/github.repository";

export interface ResolverConstructor {
    new (lang: string, repo: Repository) : Resolver;
}

export default abstract class Resolver {
    path: string;
    lang: string;
    repo: Repository;
    files: Directory;
    cache: Map<string, any>;

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

        const remotePath = Path.join(this.lang, this.path, file).replace(/\\/g, "/");

        if (this.files.get(file) === undefined)
            throw new Error(`${remotePath} is not a file or is not found.`);

        if (this.cache.has(file))
            return this.cache.get(file);

        const data = JSON.parse(await this.files.download(file));
        this.cache.set(file, data);

        return data;
    }
}