/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import Repository from "lib/github/github.repository";
import Resolver from "./resolver.base";

export default class GameCfgResolver extends Resolver {
    constructor(path: string, lang: string, repo: Repository) {
        super(path, lang, repo);
    }

    async resolve() {
        return [this];
    }
}