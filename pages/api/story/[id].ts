/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import { GetFileByIdQuery } from "lib/schemas";
import Story from "lib/models/gamecfg/model..story";
import createModel from "lib/createModel";


export default createModel(Story, GetFileByIdQuery);