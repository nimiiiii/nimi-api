/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import Equipment from "lib/models/equipment/model.equip";
import { GetEntryByIdQuery } from "lib/schemas";
import createModel from "lib/createModel";

export default createModel(Equipment, GetEntryByIdQuery);