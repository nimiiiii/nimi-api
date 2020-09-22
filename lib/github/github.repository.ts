import {Octokit} from "@octokit/rest";
import Directory from "./github.directory";

/**
 *  Represents a Repository on GitHub to pull data from
 */
export default class Repository {
    token: string;
    repoString: string;
    owner: string;
    name: string;
    branch: string;
    github: Octokit;

    /**
     * 
     * @param token Your GitHub Application Token
     * @param repoString the string used for the repository formatted as owner/name
     * @param branch the branch to pull data from
     */
    constructor (token: string, owner: string, name: string, branch: string) {
        this.owner = owner;
        this.name = name;
        this.branch = branch;
        this.github = new Octokit({auth: token});
    }

    /**
     * Gets the directory tree for the specific git repository in GitHub
     * @param path the path of where the data is
     */
    async getDirectory(path: string) {
        let { data: { tree } } = (await this.github.git.getTree({
            repo: this.name,
            owner: this.owner,
            tree_sha: `${this.branch}:${path}`
        }));

        return new Directory(this.github, this, path, tree);
    }
}