/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
export default class RequestError extends Error {
    code: number;

    constructor(code: number, message: string) {
        super(message);

        this.code = code;
    }
}