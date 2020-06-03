class Model {
    serialize() {
        return Object.getOwnPropertyNames(this).reduce((a, b) => {
            if (this[b] === undefined)
                throw new TypeError("Cannot serialize undefined type");

            if (typeof this[b] == "function")
                a[b] = this[b]();
            else
                a[b] = this[b];
            return a;
        }, {});
    }
}

module.exports = Model;