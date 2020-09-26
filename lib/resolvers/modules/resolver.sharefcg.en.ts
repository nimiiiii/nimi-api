/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import Repository from "lib/github/github.repository";
import ShareCfgResolver from "../resolver.sharecfg.base";

export default class EnShareCfgResolver extends ShareCfgResolver {
    constructor(repo: Repository) {
        super("EN", repo);
    }
}