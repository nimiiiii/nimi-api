/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import EquipmentSkinTheme from "lib/models/equipment/model.equip.skin.theme";
import { GetEntryByIdQuery } from "lib/schemas";
import createModel from "lib/createModel";

export default createModel(EquipmentSkinTheme, GetEntryByIdQuery);