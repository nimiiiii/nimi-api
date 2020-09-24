import Model from "./model.base";
import ShareCfgResolver from "../resolvers/resolver.sharecfg.base";

export default abstract class ShareCfgModel extends Model {
    @Model.exclude()
    dependencies: string[];

    constructor(dependencies: Array<string> = []) {
        super(ShareCfgResolver);

        this.dependencies = dependencies;
    }
}