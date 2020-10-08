/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import Model from "./model.base";
import ShareCfgResolver from "../resolvers/resolver.sharecfg.base";

/**
 * A model variant that uses a `ShareCfgResolver` to resolve dependencies
 */
export default abstract class ShareCfgModel extends Model<ShareCfgResolver> {
    constructor() {
        super(ShareCfgResolver);
    }

    /**
     * Denote a `ShareCfgModel` depends on data that will be resolved and passed to it's loader method.
     * @param dependencies An array of dependency names as listed in `ShareCfgResolver`
     */
    static dependsOn(dependencies: Array<string>) {
        return Reflect.metadata("dependencies", dependencies);
    }
}