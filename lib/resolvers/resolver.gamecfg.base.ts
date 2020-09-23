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