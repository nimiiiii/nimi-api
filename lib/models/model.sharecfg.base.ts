import Model from "./model.base";
import ShareCfgResolver from "../resolvers/resolver.sharecfg.base";

export default abstract class ShareCfgModel extends Model {
    constructor() {
        super(ShareCfgResolver);
    }
}