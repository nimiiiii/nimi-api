import { Octokit } from "@octokit/rest";
import Repository from "./github.repository";

type TreeItem = {
    path: string;
    mode: string;
    type: string;
    size: number;
    sha: string;
    url: string;
}

export default class Directory {
    github: Octokit;
    repo: Repository;
    path: string;
    tree: TreeItem[];

    constructor(github: Octokit, repo: Repository, path: string, tree: TreeItem[]) {
        this.github = github;
        this.repo = repo;
        this.path = path;
        this.tree = tree;
    }

    get(name: string) : TreeItem {
        const file = this.tree.find(f => f.path == name && f.type == "blob");
        return file ? file : null;
    }

    async download(name:string) : Promise<string> {
        const file = this.get(name);

        const blob = await this.github.git.getBlob({
            repo: this.repo.name,
            owner: this.repo.owner,
            file_sha: file.sha
        });

        return blob.data.content, blob.data.encoding;
    }
}