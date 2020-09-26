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

export const REGIONS = {
    "en": "EN",
    "jp": "JP",
    "cn": "CN",
    "tw": "TW",
    "ko": "KR"
};

export const TAG_REGEX = /<[^>]*>/g;