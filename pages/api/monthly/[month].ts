/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import * as joiful from "joiful";
import MonthlySignIn from "lib/models/shared/model.monthly";
import createModel from "lib/createModel";
import { GetEntryByRegionQuery, position } from "lib/schemas";

class GetMonthQuery extends GetEntryByRegionQuery {
    @joiful.number().min(1).max(12).required()
    @position(0)
    month: number
}

export default createModel(MonthlySignIn, GetMonthQuery);