import Repository from "lib/github/github.repository";
import ShareCfgResolver from "../resolver.sharecfg.base";

export default class EnShareCfgResolver extends ShareCfgResolver {
    constructor(repo: Repository) {
        super("EN", repo);
    }
}