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
}