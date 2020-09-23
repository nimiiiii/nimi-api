import Model from "./model.base";
import Skill from "./model.skill";
import ShipListItem from "./model.ship.list.item";

export default class Ship extends Model {
    @Model.exclude()
    breakoutLevel: number;

    @Model.exclude()
    base: ShipListItem;

    ammoCount: number;
    armorType: number;
    equipment: any;
    attributes: any;
    skills: Skill[];
    breakouts: any[];
    skins: any[];
    acquisition: ShipAcquisitionDetails;

    constructor(groupId: number, breakoutLevel: number) {
        super();

        this.base = new ShipListItem(groupId, breakoutLevel);
    }

    async load(ships: any[], shipBreakouts: any[]): Promise<void> {
        Object.apply(this, this.base);

        const { ship, stats, group } = this.base;

        this.ammoCount = ship.ammo;
        this.skills = ship.buff_list.map((id: number) => new Skill(id));

        this.breakouts = shipBreakouts
            .filter(b => ships.filter(s => s.group_type == this.base.groupId)
                .map(s => s.id).includes(b.id))
            .map(b => {
                return {
                    description: (b.breakout_view != "N/A")
                        ? b.breakout_view.replace(/\//g, " / ")
                        : b.breakout_view,
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

        this.acquisition = group.description.reduce((output : ShipAcquisitionDetails, [text, [action, args]] : ShipGroupDescriptionItem) => {
            text = text.trim();

            switch (action) {
                case ShipDescriptionAction.Shop && args.warp:
                    output.exchange = args.warp;
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
                        for (let type of [...types])
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
                    output.task = ACQUISITION_TASK[text]
                    break;
                }

                return output;
            },
            ACQUISITION_DEFAULTS
        );
    }
}

interface ShipAcquisitionDetails {
    task: string,
    chapter: number,
    stage: number,
    event: string,
    exchange: ShipExchangeLocation,
    collection: boolean,
    construction: {
        light: boolean,
        heavy: boolean,
        special: boolean,
        limited: boolean,
        research: boolean
    }
}

type ShipGroupDescriptionItem = [string, [ShipDescriptionAction, any?]]

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
}

const ACQUISITION_WARP = {
    "sham": ShipExchangeLocation.Core,
    "supplies": ShipExchangeLocation.Munitions
}