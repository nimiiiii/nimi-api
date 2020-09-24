import Directory from "../github/github.directory";
import Model from "lib/models/model.base";
import Path from "path";
import Redis from "ioredis";
import Repository from "../github/github.repository";
import fs from "fs-extra";
interface ResolverLoadOptions {
    lang: string[],
    path?: string,
    token: string,
    owner: string,
    branch: string,
    repository: string
}


export interface ResolverConstructor {
    new (lang: string, repo: Repository) : Resolver;
}

export default abstract class Resolver {
    path: string;
    lang: string;
    repo: Repository;
    files: Directory;
    references: Redis.Redis;

    static DATA_PATH = "./.data";
    static MODULE_PATH = Path.resolve(__dirname, "modules");

    constructor(path: string, lang: string, repo: Repository) {
        this.path = path;
        this.lang = lang;
        this.repo = repo;
        this.files = null;
        this.references = null;
    }

    /**
     * Retrieve a list of initialized resolvers from a directory
     * @param options Options passed to load resolvers
     */
    static async Load(options: ResolverLoadOptions) : Promise<Resolver[]> {
        const path = options?.path ?? Resolver.MODULE_PATH;
        const repo = new Repository(options.token, options.owner, options.repository, options.branch);

        const resolvers = [];
        const modules = fs.readdirSync(path);

        for (const artifact of modules) {
            const stats = fs.lstatSync(Path.join(path, artifact));

            if (stats.isFile() && artifact.endsWith(".js")) {
                const Module = await import(Path.resolve(Path.join(path, artifact)));

                if (Module && Module.prototype instanceof Resolver) {
                    const resolver : Resolver = new Module(repo);

                    if (options.lang.includes(resolver.lang)) {
                        await resolver.init();
                        resolvers.push(resolver);
                    }
                }
            }
        }

        return resolvers;
    }

    get initialized() : boolean {
        return this.files !== null || this.references !== null;
    }

    async init() : Promise<void> {
        this.files = await this.repo.getDirectory(Path.join(this.lang, this.path)
            .replace(/\\/g, "/"));
        this.references = new Redis(process.env.REDIS_URL);
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

        const refLocal = await this.references.get(remotePath);
        const refRemote = this.files.get(file)?.sha ?? undefined;
        const targetDir = Path.join(Resolver.DATA_PATH, "/files", this.lang, file);

        let obj: any;
        if (refLocal == refRemote) {
            obj = await fs.readJSON(targetDir);
        }
        else {
            obj = JSON.parse(await this.files.download(file));
            // expire for 56 hours then pull the reference hash again
            // this ensures we always have the fresh references always.
            this.references.set(targetDir, obj, "ex", 1000 * 60 * 60 * 56);
        }

        return obj;
    }
}