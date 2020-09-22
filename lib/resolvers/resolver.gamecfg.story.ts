import Repository from "lib/github/github.repository";
import GameCfgResolver from "./resolver.gamecfg.base";

export default class StoryGameCfgResolver extends GameCfgResolver {
    constructor(lang: string, repo: Repository) {
        super("/story", lang, repo);
    }
}