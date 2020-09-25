module.exports = {
    async headers() {
        return [{
            source: "/api/:name*",
            headers: [
                {
                    key: "cache-control",
                    value: "s-maxage=28800, public"
                }
            ]
        }];
    },
    target: "serverless"
};