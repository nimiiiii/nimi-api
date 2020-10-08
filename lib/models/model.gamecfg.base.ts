/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import GameCfgResolver from "lib/resolvers/resolver.gamecfg.base";
import Model from "./model.base";

export default abstract class GameCfgModel<T extends GameCfgResolver> extends Model<T> {
    abstract async load(resolver: T) : Promise<void>;
}