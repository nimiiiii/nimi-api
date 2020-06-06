const Model = require("./base");
const RequestError = require("../util/requesterror");
const ShipSkinMixin = require("./mixins/shipskinmixin");

class ShipSkin extends Model {
    constructor(skinId) {
        super();

        this.skinId = skinId;
    }

    async load(shipSkins, shipSkinsDialogue, shipSkinsDialogueExtra) {
        const skin = shipSkins.find(s => s.id == this.skinId);

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

                    obj[val] = dialogue[key];

                    return obj;
                }, {});

        this.dialogueExtra = (!extra)
            ? null
            : Object.entries(SHIP_DIALOGUE_MAP)
                .reduce((obj, entry) => {
                    const [key, val] = entry;

                    if (Array.isArray(extra[key]))
                        obj[val] = extra[0][1];
                    else if (typeof extra[key] == "string" && extra[key].length > 0)
                        obj[val] = extra[key];

                    return obj;
                }, {});
    }
}

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
    main: "idle1",
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