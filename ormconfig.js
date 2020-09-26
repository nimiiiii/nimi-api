/* eslint-disable no-undef */
module.exports = {
    type: "mongodb",
    host: process.env.UNICORN_DB_HOST || "localhost",
    entities: ["./entities/*.ts"],
    migrations: ["./migrations/*.ts"]
};