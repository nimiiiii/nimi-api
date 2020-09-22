class Model {
    async load() {
        return null;
    }

    serialize() {
        return Object.getOwnPropertyNames(this).reduce((acc, cur) => {
            if (!cur.startsWith("_"))
                acc[cur] = this[cur];

            return acc;
        }, {});
    }
}

module.exports = Model;