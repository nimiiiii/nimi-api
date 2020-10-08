/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import GameCfgModel from "../model.gamecfg.base";
import Model from "../model.base";
import StoryGameCfgResolver from "../../resolvers/resolver.gamecfg.story";

interface Dialogue {
    actorId: number,
    actorName: string,
    text: string,
    effects: {
        sound: string,
        background: string,
        backgroundMusic: string
    }
}

export default class Story extends GameCfgModel<StoryGameCfgResolver> {
    @Model.exclude()
    id: string;

    dialogue: Dialogue[]

    constructor(id: string) {
        super(StoryGameCfgResolver);

        this.id = id;
    }

    async load(resolver: StoryGameCfgResolver) {
        const data = await resolver.get(this.id + ".json");

        this.dialogue = data.scripts.map(s => ({
            actorId: s.actor,
            actorName: s.actorName,
            text: s.say,
            effects: {
                sound: s.soundeffect,
                background: s.bgName,
                backgroundMusic: s.bgm
            }
        }));
    }
}