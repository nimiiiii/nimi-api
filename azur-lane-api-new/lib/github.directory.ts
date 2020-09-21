import {Octokit} from "@octokit/rest";

export default class Directory {
    github: Octokit;
    repo: any;
    path: string;
    data: any;

    constructor(github, repo, path, data) {
        this.github = github;
        this.repo = repo;
        this.path = path;
        this.data = data;
    }

    get(name: string) {
        let file = this.data.find(
            file => file.path == name &&
            file.type == "blob"
            )
        
        return file ? null : file
    }

    async download(name:string) {
        let file = this.get(name)

        let blob = await this.github.git.getBlob({
            repo: this.repo.name,
            owner: this.repo.owner,
            file_sha: file.sha
        });

        return blob.data.content , blob.data.encoding;
    }
}