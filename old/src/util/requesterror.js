class RequestError extends Error {
    constructor(status, message, source) {
        super(message);
        this.status = status;
        this.source = source;

        if (source)
            this.stack = this.stack.split("\n").slice(0, 2).join("\n") +
                "\n" + source.stack;
    }
}

module.exports = RequestError;