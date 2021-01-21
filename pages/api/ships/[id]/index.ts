/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import * as joiful from "joiful";
import Ship from "lib/models/ships/model.ship";
import createModel from "lib/createModel";
import { GetEntryByIdQuery, position } from "lib/schemas";

export class GetShipQuery extends GetEntryByIdQuery {
    @joiful.number().optional().default(1).min(1).max(4)
    @position(0)
    breakoutLevel?: number
}

export default createModel(Ship, GetShipQuery);