import Model from "./model.base";
import ShareCfgResolver from "../resolvers/resolver.sharecfg.base";

export default abstract class ShareCfgModel extends Model {
    constructor() {
        super(ShareCfgResolver);
    }

    static dependsOn(dependencies: Array<string>) {
        return Reflect.metadata("dependencies", dependencies);
    }
}