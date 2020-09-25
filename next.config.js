module.exports = {
    async headers() {
        return [{
            source: "/api/*",
            headers: [
                {
                    key: "cache-control",
                    value: "s-maxage=201600, public"
                }
            ]
        }];
    },
    target: "serverless"
};