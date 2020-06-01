const { REGIONS } = require("../util/constants");
const { Octokit } = require("@octokit/rest");
const github = new Octokit({ auth: process.env.GITHUB_TOKEN });

module.exports = {
    path: "/version/:region",
    func: async function(req, res) {
        let [ owner, repo ] = process.env.DATA_REPO.split("/");
        let commits = await github.repos.listCommits({ owner, repo });
        let region = REGIONS[req.params.region];
        
        if (!region)
            return res.jsonp({ error: "Not Found" });

        let messages = commits.data.map(c => c.commit.message);
        let commit = messages.find(m => m.includes(region));
        let info = [...commit.matchAll(/(\w+): (\S+)/g)]
            .reduce((acc, cur) => {
                acc[cur[1].toLowerCase()] = cur[2]
                return acc;
            }, {});

        res.jsonp(info);
    }
}