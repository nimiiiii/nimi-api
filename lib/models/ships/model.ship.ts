/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import Model from "../model.base";
import { SHIP_ATTR_TYPE } from "lib/constants";
import ShareCfgModel from "../model.sharecfg.base";
import ShipListItem from "./model.ship.list.item";
import Skill from "../shared/model.skill";

type ShipGroupDescriptionItem = [string, [ShipDescriptionAction, any]]

enum ShipExchangeLocation {
    Core = "core",
    Medal = "medal",
    Munitions = "munitions",
}

enum ShipDescriptionAction {
    None,
    Shop = "SHOP",
    Research = "SHIPBLUEPRINT",
    Collection = "COLLECTSHIP",
    Checkpoint = "LEVEL",
    Construction = "GETBOAT",
}

interface ShipAcquisitionDetails {
    task: string,
    chapter: number,
    stage: number,
    event: string,
    exchange: ShipExchangeLocation,
    collection: boolean,
    attributes: { [key: string]: number };
    construction: {
        light: boolean,
        heavy: boolean,
        special: boolean,
        limited: boolean,
        research: boolean
    }
}

@ShareCfgModel.dependsOn([ "ships", "shipBreakouts" ])
export default class Ship extends ShareCfgModel {
    @Model.exclude()
    base: ShipListItem;

    ammoCount: number;
    armorType: number;
    equipment: any;
    attributes: any;
    skills: Skill[];
    breakouts: any[];
    acquisition: ShipAcquisitionDetails;

    constructor(groupId: number, breakoutLevel: number) {
        super();

        this.base = new ShipListItem(groupId, breakoutLevel);
    }

    async load(ships: any[], breakouts: any[]): Promise<void> {
        this.mixin(this.base);

        const { ship, stats, group } = this.base.item;

        this.ammoCount = ship.ammo;
        this.skills = ship.buff_list.map((id: number) => new Skill(id));

        this.breakouts = breakouts
            .filter(b => ships.filter(s => s.group_type == this.base.groupId)
                .map(s => s.id).includes(b.id))
            .map(b => {
                return {
                    description: (b.breakout_view != "N/A")
                        ? b.breakout_view.replace(/\//g, " / ")
                        : b.breakout_view,
                    level: b.level,
                    cost: {
                        gold: b.use_gold,
                        ship: b.use_char_num
                    }
                };
            });

        this.armorType = stats.armor_type;
        this.equipment = Object.keys(ship)
            .filter(key => /equip_\d/.test(key))
            .reduce((obj, key, idx) => {
                const slot = idx + 1;
                obj[slot] = {};
                obj[slot].types = ship[key];

                if (stats.equipment_proficiency[idx])
                    obj[slot].proficiency = stats.equipment_proficiency[idx];

                return obj;
            }, {});

        this.attributes = Object.entries(SHIP_ATTR_TYPE)
            .reduce((obj, entry) => {
                const [key, val] = entry;
                obj[val] = stats.attrs[parseInt(key)];
                return obj;
            }, { oxy: ship.oxy_max });

        this.acquisition = group.description.reduce((
            output : ShipAcquisitionDetails,
            [text, [action, args]] : ShipGroupDescriptionItem
        ) => {
            text = text.trim();

            switch (action) {
                case ShipDescriptionAction.Shop:
                    if (args.warp)
                        output.exchange = ACQUISITION_WARP[args.warp];
                    break;

                case ShipDescriptionAction.Collection:
                    output.collection = true;
                    break;

                case ShipDescriptionAction.Research:
                    output.construction.research = true;
                    break;

                case ShipDescriptionAction.Construction:
                    if (args.page == 3)
                        output.exchange = ShipExchangeLocation.Medal;

                    const types = text.match(REGEX_CONSTRUCT);
                    if (types !== null) {
                        for (const type of [...types])
                            output.construction[type.toLowerCase()] = true;
                    }
                    break;

                case ShipDescriptionAction.Checkpoint:
                    const [, chapter, stage] = text.match(REGEX_CHECKPOINT);
                    output.chapter = parseInt(chapter);
                    output.stage = parseInt(stage);
                    break;

                default:
                    if (REGEX_EVENT.test(text))
                        output.event = text.match(REGEX_EVENT)[1];

                    // For some reason this is inconsistent with how all events are named so far
                    if (text == "The War God's Return")
                        output.event = text;

                    output.construction.limited = text.includes("Limited");
                    output.task = ACQUISITION_TASK[text];
                    break;
            }

            return output;
        }, ACQUISITION_DEFAULTS);
    }
}

const REGEX_CONSTRUCT = /(light|heavy|special)/gi;
const REGEX_CHECKPOINT = /(\d+)-(\d+)/;
const REGEX_EVENT = /Event: (.+)/;

const ACQUISITION_DEFAULTS = {
    chapter: null,
    stage: null,
    task: null,
    event: null,
    exchange: null,
    collection: false,
    construction: {
        light: false,
        heavy: false,
        special: false,
        limited: false,
        research: false
    }
};

const ACQUISITION_TASK = {
    "CBT Reward": "closedBetaParticipant",
    "Weekly Mission": "weeklyMission",
    "Monthly Sign-in": "monthlySignIn",
    "Hidden Mission:Im-paws-ible quest": "akashiMissions"
};

const ACQUISITION_WARP = {
    "sham": ShipExchangeLocation.Core,
    "supplies": ShipExchangeLocation.Munitions
};