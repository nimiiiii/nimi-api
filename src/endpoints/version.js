const { Octokit } = require("@octokit/rest");
const ErrorHandler = require("../util/errorhandler");
const github = new Octokit({ auth: process.env.GITHUB_TOKEN });

module.exports = {
    path: "/version",
    func: async function(req, res, next) {
        try {
            let [ owner, repo ] = process.env.DATA_REPO.split("/");
            let commits = await github.repos.listCommits({ owner, repo });
            let region = req.query.region;

            let messages = commits.data.map(c => c.commit.message);
            let commit = messages.find(m => m.includes(region));
            let info = [...commit.matchAll(/(\w+): (\S+)/g)]
                .reduce((acc, cur) => {
                    acc[cur[1].toLowerCase()] = cur[2];
                    return acc;
                }, {});

            res.jsonp(info);
        } catch (err) {
            next(new ErrorHandler(500, err.message));
        }
    }
};