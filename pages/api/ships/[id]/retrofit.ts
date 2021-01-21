/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import { GetShipQuery } from ".";
import ShipRetrofit from "lib/models/ships/model.ship.retrofit";
import createModel from "lib/createModel";

export default createModel(ShipRetrofit, GetShipQuery);