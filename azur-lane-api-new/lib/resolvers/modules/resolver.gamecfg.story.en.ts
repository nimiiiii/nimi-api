import StoryGameCfgResolver from "../resolver.gamecfg.story";

export default class EnStoryGameCfgResolver extends StoryGameCfgResolver {
    constructor(repo) {
        super("EN", repo);
    }
}