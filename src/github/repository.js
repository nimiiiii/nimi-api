const { Octokit } = require("@octokit/rest");
const Directory = require("./directory");

class Repository {
    constructor(token, repoString, branch) {
        let [ owner, name ] = repoString.split("/");
        this.owner = owner;
        this.name = name;
        this.branch = branch;
        this.github = new Octokit({ auth: token });
    }

    async getDirectory(path) {
        let { data: { tree } } = (await this.github.git.getTree({
            repo: this.name,
            owner: this.owner,
            tree_sha: `${this.branch}:${path}`
        }));

        return new Directory(this.github, this, path, tree);
    }
}

module.exports = Repository;