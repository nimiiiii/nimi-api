class ShipAcquisitionMixin {
    constructor(data) {
        this.acquisition = data.reduce((output, entry) => {
            let [text, [action, args]] = entry;
            text = text.trim();

            if (action == "SHOP" && args)
                output.exchange = ACQ_WARP_MAP[args.warp];

            if (action == "COLLECTSHIP")
                output.collection = true;

            if (action == "SHIPBLUEPRINT")
                output.construction.research = true;

            if (action == "GETBOAT") {
                if (args.page == 3)
                    output.exchange = "medal";

                const constructTypes = text.match(ACQ_CONSTRUCT_REGEX);
                if (constructTypes !== null) {
                    for (let type of [...constructTypes]) {
                        output.construction[type.toLowerCase()] = true;
                    }
                }
            }

            if (action == "LEVEL") {
                const [, chapter, stage] = text.match(ACQ_LEVEL_REGEX);
                output.map = {
                    id: args.chapterid,
                    chapter: parseInt(chapter),
                    stage: parseInt(stage)
                };
            }

            if (action.length == 0) {
                if (ACQ_EVENT_REGEX.test(text))
                    output.event = text.match(ACQ_EVENT_REGEX)[1];

                if (text.includes("Limited"))
                    output.construction.limited = true;

                if (ACQ_TASK_MAP[text])
                    output.task = ACQ_TASK_MAP[text];

                // For some reason this event is inconsistent with the others.
                // We'll just explicity check for this for now.
                if (text == "The War God's Return")
                    output.event = text;
            }

            return output;
        }, ACQ_DEFAULTS);
    }
}

const ACQ_CONSTRUCT_REGEX = /(light|heavy|special)/gi;
const ACQ_LEVEL_REGEX = /(\d+)-(\d+)/;
const ACQ_EVENT_REGEX = /Event: (.+)/;

const ACQ_DEFAULTS = {
    map: null,
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

const ACQ_TASK_MAP = {
    "CBT Reward": "closedBetaParticipant",
    "Weekly Mission": "weeklyMission",
    "Monthly Sign-in": "monthlySignIn",
    "Hidden Mission:Im-paws-ible quest": "akashiMissions"
};

const ACQ_WARP_MAP = {
    "sham": "core",
    "supplies": "munitions"
};

module.exports = ShipAcquisitionMixin;