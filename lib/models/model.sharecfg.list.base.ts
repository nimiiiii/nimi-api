/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import ShareCfgModel from "./model.sharecfg.base";

export default abstract class ShareCfgModelList<T extends ShareCfgModel> extends ShareCfgModel {
    entries : T[] = [];
}