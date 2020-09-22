import { readJSON, outputJSON, ensureDir, readdir, lstat } from "fs-extra";
import FileNotFoundError from "../fileNotFoundError";
import * as path from "path";

export default abstract class Remote {
    dir: string;
    lang: string;
    repo: any;
    files: any;
    references: any;
    dataPath: any;
    initialized: boolean;

    constructor (dir: any, lang: any, repo: any) {
        this.dir = dir;
        this.lang = lang;
        this.repo = repo;
        this.files = null;
        this.references = null;
    }

    async init (): Promise<void> {
        console.log(`Initializing ${this.constructor.name}`);

        await ensureDir(this.dataPath);

        this.files = await this.repo.getDirectory(path.join(this.lang, this.dir)
            .replace(/\\/g, "/"));
    }

    abstract async resolve(...args: any): Promise<any>;

    async get(file: string) {
        if (!this.initialized) throw new Error("Remote has not ye been initialized");
    }
}