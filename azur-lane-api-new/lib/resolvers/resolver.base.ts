import fs from "fs";
import Path from "path";
import Enmap from "enmap";
import Directory from "lib/github/github.directory";
import Repository from "lib/github/github.repository";
import FileNotFoundError from "lib/fileNotFoundError";

export default abstract class Resolver {
    path: string;
    lang: string;
    repo: Repository;
    files: Directory;
    references: Enmap;

    static DATA_PATH: string = "./.data";
    static MODULE_PATH: string = Path.resolve(__dirname, "modules");

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
    
        let resolvers = [];
        let modules = fs.readdirSync(path);

        for (let artifact of modules) {
            let stats = fs.lstatSync(Path.join(path, artifact));

            if (stats.isFile() && artifact.endsWith(".js")) {
                let Module = await import(Path.resolve(Path.join(path, artifact)));

                if (Module && Module.prototype instanceof Resolver) {
                    let resolver : Resolver = new Module(repo);

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

        this.references = new Enmap({
            name: "file_references",
            dataDir: Resolver.DATA_PATH,
            autoFetch: false
        });

        await this.references.defer;
    }

    /**
     * Resolves a model's loader method and passes back resolved values to its arguments
     * @param loader A model's loader method
     */
    abstract async resolve(loader: Function) : Promise<any[]>

    /**
     * Retrieves a file from cache or downloads the file from the repository if it doesn't exist.
     * @param file The file name to retrieve.
     */
    async get(file: string) : Promise<any> {
        if (!this.initialized)
            throw new Error("Remote has not been initialized");

        let remotePath = Path.join(this.lang, this.path, file).replace(/\\/g, "/");

        if (this.files.get(file) === undefined)
            throw new FileNotFoundError(`${remotePath} is not a file or is not found.`);

        let refLocal = this.references.get(remotePath);
        let refRemote = this.files.get(file).sha;
        let targetDir = Path.join(Resolver.DATA_PATH, "/files", this.lang, "json");

        let obj: any;
        if (refLocal == refRemote) {

        }
        else {
            obj = JSON.parse(await this.files.download(file));
            this.references.set(targetDir, obj);
        }

        return obj;
    }
}

interface ResolverLoadOptions {
    lang: string[],
    path?: string,
    token: string,
    owner: string,
    branch: string,
    repository: string
}