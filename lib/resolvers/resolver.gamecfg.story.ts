/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import GameCfgResolver from "./resolver.gamecfg.base";
import Repository from "lib/github/github.repository";
import { ResolverRegion } from "./resolver.base";

/**
 * A resolver that resolves from the `/story` directory
 */
export default class StoryGameCfgResolver extends GameCfgResolver {
    constructor(lang: ResolverRegion, repo: Repository) {
        super("/story", lang, repo);
    }
}