import ModelList from "./model.list.base";
import ShareCfgResolver from "lib/resolvers/resolver.sharecfg.base";

export default abstract class ShareCfgModelList extends ModelList {
    constructor() {
        super(ShareCfgResolver);
    }
}