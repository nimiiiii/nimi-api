/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
/* eslint-disable no-undef */
module.exports = {
    type: "mongodb",
    host: process.env.UNICORN_DB_HOST || "mongodb://localhost:27017/nimi",
    useNewUrlParser: true,
    synchronize: true,
    logging: true,
    entities: ["./lib/entities/*.*"],
    migrations: ["./lib/migrations/*.*"]
};