/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
export const SHIP_ATTR_TYPE = {
    0: "health",
    1: "cannon",
    2: "torpedo",
    3: "antiAir",
    4: "aviation",
    5: "reload",
    6: "armor",
    7: "hit",
    8: "evasion",
    9: "speed",
    10: "luck",
    11: "antiSub"
};

export const TAG_REGEX = /<[^>]*>/g;

export const NAMECODE_REGEX = /{namecode:(\d+)}/;

export const SCHEMA_POSITION_KEY = "nimi-schema:position";

export const MODEL_EXCLUDE_KEY = "nimi-model:exclude";

export const MODEL_DEPENDS_KEY = "nimi-model:depends";