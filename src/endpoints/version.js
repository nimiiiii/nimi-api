const { Octokit } = require("@octokit/rest");
const Endpoint = require("../endpoint");
const github = new Octokit({ auth: process.env.GITHUB_TOKEN });

class VersionEndpoint extends Endpoint {
    constructor() {
        super("/version", null);
    }

    async action(req) {
        let [ owner, repo ] = process.env.DATA_REPO.split("/");
        let commits = await github.repos.listCommits({ owner, repo });
        let region = req.query.region;

        let messages = commits.data.map(c => c.commit.message);
        let commit = messages.find(m => m.includes(region));
        return [...commit.matchAll(/(\w+): (\S+)/g)]
            .reduce((acc, cur) => {
                acc[cur[1].toLowerCase()] = cur[2];
                return acc;
            }, { region });
    }
}

module.exports = VersionEndpoint;