/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import StoryGameCfgResolver from "../resolver.gamecfg.story";

export default class EnStoryGameCfgResolver extends StoryGameCfgResolver {
    constructor(repo) {
        super("EN", repo);
    }
}