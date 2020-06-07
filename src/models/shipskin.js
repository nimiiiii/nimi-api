const Model = require("./base");
const RequestError = require("../util/requesterror");
const ShipSkinMixin = require("./mixins/shipskinmixin");

class ShipSkin extends Model {
    constructor(skinId) {
        super();

        this._skinId = skinId;
    }

    async load(codes, shipSkins, shipSkinsDialogue, shipSkinsDialogueExtra) {
        const skin = shipSkins.find(s => s.id == this._skinId);

        if (!skin)
            throw new RequestError(404, "Ship skin not found.");

        Object.assign(this, new ShipSkinMixin(skin));

        this.background = skin.bg;
        this.backgroundMusic = skin.bgm;

        const dialogue = shipSkinsDialogue.find(d => d.id == this.skinId);
        const extra = shipSkinsDialogueExtra.find(d => d.id == this.skinId);

        this.dialogue = (!dialogue)
            ? null
            : Object.entries(SHIP_DIALOGUE_MAP)
                .reduce((obj, entry) => {
                    const [key, val] = entry;

                    if (key == "main") {
                        // Dialogue is split using a pipe character
                        dialogue[key].split("|").forEach((text, idx) => {
                            // nil is null in Lua
                            obj[`idle${idx + 1}`] = (text != "nil")
                                ? replaceNameCodes(text, codes)
                                : null;
                        });
                    } else
                        obj[val] = (dialogue[key].length > 0)
                            ? replaceNameCodes(dialogue[key], codes)
                            : null;

                    return obj;
                }, {});

        this.dialogueExtra = (!extra)
            ? null
            : Object.entries(SHIP_DIALOGUE_MAP)
                .reduce((obj, entry) => {
                    const [key, val] = entry;

                    if (Array.isArray(extra[key])) {
                        if (key == "main") {
                            extra[key][0][1].split("|").forEach((text, idx) => {
                                obj[`idle${idx + 1}`] = replaceNameCodes(text, codes);
                            });
                        } else
                            obj[val] = replaceNameCodes(extra[key][0][1], codes);
                    } else
                        obj[val] = (typeof extra[key] == "string" && extra[key].length > 0)
                            ? replaceNameCodes(extra[key], codes)
                            : null;

                    return obj;
                }, {});
    }
}

function replaceNameCodes(str, codes) {
    return str.replace(NAMECODE_REGEX, function(match, p1) {
        const { code } = codes.find(c => c.id == parseInt(p1));
        return code;
    });
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

module.exports = ShipSkin;