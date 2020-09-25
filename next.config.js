module.exports = {
    async headers() {
        return [{
            source: "/api/:name*",
            headers: [
                {
                    key: "Cache-Control",
                    value: "s-maxage=1, stale-while-revalidate"
                }
            ]
        }];
    },
    target: "serverless"
};
