class Directory {
    constructor(github, repo, path, data) {
        this.github = github;
        this.repo = repo;
        this.path = path;
        this.data = data;
    }

    get(name) {
        const file = this.data.find(file => file.path == name && file.type == "blob");

        if (!file)
            return;

        return file;
    }

    async download(name) {
        let file = this.get(name);

        let blob = await this.github.git.getBlob({
            repo: this.repo.name,
            owner: this.repo.owner,
            file_sha: file.sha
        });

        return Buffer.from(blob.data.content, blob.data.encoding).toString("utf-8");
    }
}

module.exports = Directory;