import GameCfgResolver from "./resolver.gamecfg.base";
import Repository from "lib/github/github.repository";

export default class StoryGameCfgResolver extends GameCfgResolver {
    constructor(lang: string, repo: Repository) {
        super("/story", lang, repo);
    }
}