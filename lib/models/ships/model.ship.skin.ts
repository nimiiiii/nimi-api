/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import Model from "../model.base";
import ShareCfgModel from "../model.sharecfg.base";
import ShipSkinListItem from "./model.ship.skin.list.item";

@ShareCfgModel.dependsOn([ "codes", "shipSkinsDialogue", "shipSkinsDialogueExtra" ])
export default class ShipSkin extends ShareCfgModel {
    @Model.exclude()
    base: ShipSkinListItem;

    id: number;
    background: string;
    backgroundMusic: string;
    dialogue: {
        [key: string]: string
    }
    dialogueExtra: {
        [key: string]: string
    }

    constructor(id: number) {
        super();

        this.base = new ShipSkinListItem(id);
    }

    async load(codes: any[], dialogue: any[], extras: any[]) {
        this.mixin(this.base);

        const d = dialogue.find(d => d.id == this.base.id);
        const e = extras.find(d => d.id == this.base.id);

        this.dialogue = (!d)
            ? null
            : Object.entries(SHIP_DIALOGUE_MAP)
                .reduce(mapDialogue(d, codes), {});

        this.dialogueExtra = (!e)
            ? null
            : Object.entries(SHIP_DIALOGUE_MAP)
                .reduce(mapDialogue(e, codes), {});
    }
}

function replaceNameCodes(str: string, codes: any) {
    return str.replace(NAMECODE_REGEX, function(match, p1) {
        const { code } = codes.find(c => c.id == parseInt(p1));
        return code;
    });
}

function mapDialogue(dialogue: any, codes: any) {
    return function (obj, [key, val]) {
        if (key == "main") {
            dialogue[key].split("|").forEach((text, index) => {
                obj[`idle${index + 1}`] = text != "nil"
                    ? replaceNameCodes(text, codes)
                    : null;
            });
        } else {
            obj[val] = (typeof dialogue[key] === "string" && dialogue[key] > 0)
                ? replaceNameCodes(dialogue[key], codes)
                : null;
        }
        return obj;
    };
}

const NAMECODE_REGEX = /\{namecode:(\d+)\}/g;

const SHIP_DIALOGUE_MAP = {
    feeling1: "affinityDisappointed",
    feeling2: "affinityStranger",
    feeling3: "affinityFriendly",
    feeling4: "affinityLike",
    feeling5: "affinityLove",
    propose: "pledge",
    drop_descrip: "description",
    profile: "selfIntroduction",
    upgrade: "strengthening",
    detail: "details",
    unlock: "acquisition",
    login: "login",
    main: "idle",
    home: "return",
    mail: "mail",
    mission: "task",
    mission_complete: "taskComplete",
    expedition: "commission",
    touch: "touch",
    touch2: "specialTouch",
    headtouch: "headpat",
    skill: "skillActivate",
    battle: "startBattle",
    hp_warning: "lowHp",
    lose: "lose",
    win_mvp: "mvp"
};