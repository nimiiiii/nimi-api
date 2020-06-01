module.exports = {
    path: "/",
    func: async function(req, res) {
        res.jsonp({
            message: "Welcome to the unofficial Azur Lane API",
        });
    }
};