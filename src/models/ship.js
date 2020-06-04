const ShipListItem = require("./shiplistitem");
const ShipSkinItem = require("./shipskinitem");
const {
    SHIP_ATTR_TYPE,
    SHIP_ARMOR_TYPE,
    SHIP_SKILL_TYPE,
    EQUIPMENT_TYPE
} = require("../util/constants");

class Ship extends ShipListItem {
    constructor(data, stat, group, skin, skill) {
        super(data, stat, group);

        this.ammoCount = data.ammo;
        this.armorType = SHIP_ARMOR_TYPE[stat.armor_type];

        this.attributes = Object.entries(SHIP_ATTR_TYPE)
            .reduce((acc, cur) => {
                const [ key, value ] = cur;
                acc[value] = stat.attrs[parseInt(key)];

                return acc;
            }, {
                oxy: data.oxy_max
            }),

        this.equipment = Object.keys(data)
            .filter(key => /equip_\d/.test(key))
            .reduce((acc, cur, idx) => {
                const slot = `slot-${idx}`;
                acc[slot] = {};
                acc[slot].types = data[cur].map(type => EQUIPMENT_TYPE[type]);

                if (idx < 4)
                    acc[slot].proficiency = stat.equipment_proficiency[idx];

                return acc;
            }, {});

        this.skins = skin.map(s => new ShipSkinItem(s));
        this.skills = skill.map(s => {
            return {
                id: s.id,
                name: s.name.trim(),
                type: SHIP_SKILL_TYPE[s.type],
                description: s.desc,
                descriptionMod: (s.desc_add[0])
                    ? s.desc_add[0].map(entry => entry[0])
                    : []
            };
        });

        this.acquisition = group.description.reduce(function(output, entry) {
            let [text, data] = entry;

            if (data[0] == "SHOP") {
                if (data[1].warp == "sham")
                    output.exchange = "core";

                if (data[1].warp == "supplies")
                    output.exchange = "munitions";
            }

            if (data[0] == "GETBOAT") {
                if (data[1].page == 3)
                    output.exchange = "medal";

                const constructTypeRegex = /(light|heavy|special)/gi;
                const constructTypes = text.match(constructTypeRegex);
                if (constructTypes !== null) {
                    for (let type of [...constructTypes].map(s => s.toLowerCase())) {
                        output.construction[type] = true;
                    }
                }
            }

            if (data[0] == "SHIPBLUEPRINT")
                output.construction.research = true;

            if (data[0] == "LEVEL") {
                const [, chapter, stage] = text.match(/(\d+)-(\d+)/);
                output.map = {
                    chapter: parseInt(chapter),
                    stage: parseInt(stage),
                    id: data[1].chapterid
                };
            }

            if (data[0].length == 0) {
                const eventRegex = /Event: (.+)/;
                if (eventRegex.test(text))
                    output.event = text.match(eventRegex)[1];

                if (text == "Time-Limited Build" || text.includes("Limited Event"))
                    output.construction.limited = true;

                if (text == "Weekly Mission")
                    output.task = "weeklyMission";

                if (text == "Monthly Sign-in")
                    output.task = "monthlySignIn";

                // For some reason this event is inconsistent with the others.
                // We'll just explicity check for this for now.
                if (text == "The War God's Return")
                    output.event = text;

                // Akashi please don't make this any more difficult
                if (text == "Hidden Mission:Im-paws-ible quest")
                    output.task = "akashiSpecial";

                // Avrora Flex
                if (text == "CBT Reward")
                    output.task = "closedBetaParticipant";
            }

            if (data[0] == "COLLECTSHIP")
                output.collection = true;

            return output;
        }, {
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
        });
    }
}

module.exports = Ship;