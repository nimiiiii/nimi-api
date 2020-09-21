const Remote = require("./base");
const getFunctionArgs = require("get-function-arguments");

class ShareCfgRemote extends Remote {
    constructor(lang, repo) {
        super("/sharecfg", lang, repo);

        this.dependencies = {};
    }

    async init() {
        this.add("ships", "ship_data_template.json");
        this.add("shipStats", "ship_data_statistics.json");
        this.add("shipSkins", "ship_skin_template.json");
        this.add("shipSkinsDialogue", "ship_skin_words.json");
        this.add("shipSkinsDialogueExtra", "ship_skin_words_extra.json");
        this.add("shipGroups", "ship_data_group.json");
        this.add("shipBreakouts", "ship_data_breakout.json");
        this.add("shipRetrofits", "ship_data_trans.json");
        this.add("shipRetrofitTasks", "transform_data_template.json");
        this.add("shipBlueprints", "ship_data_blueprint.json");

        this.add("equip", "equip_data_template.json");
        this.add("equipStats", "equip_data_statistics.json");
        this.add("equipSkins", "equip_skin_template.json");
        this.add("equipSkinThemes", "equip_skin_theme_template.json");

        this.add("skills", "skill_data_template.json");

        this.add("items", "item_data_statistics.json");
        this.add("itemPlayerResources", "player_resource.json");
        this.add("furniture", "furniture_data_template.json");

        this.add("lang", "gameset_language_client.json", (o) => o);
        this.add("tasks", "task_data_template.json");
        this.add("codes", "name_code.json");
        this.add("monthlySignIn", "activity_month_sign.json");

        this.add("social", "activity_ins_template.json");
        this.add("socialNpc", "activity_ins_npc_template.json");
        this.add("socialNpcGroup", "activity_ins_ship_group_template.json");

        await super.init();

        // Fetch any updates as needed
        for (let key of Object.keys(this.dependencies))
            await this.get(key);
    }

    add(key, file, transform = (obj) => Object.values(obj)) {
        this.dependencies[key] = { file, transform };
    }

    async resolve(method) {
        return await Promise.all(getFunctionArgs(method).map(async (d) => await this.get(d)));
    }

    async get(key) {
        const { file, transform } = this.dependencies[key];

        if (file === undefined)
            throw new Error(`Cannot resolve dependency > ${this.constructor.name}:${key}`);

        return transform(await super.get(file));
    }
}

module.exports = ShareCfgRemote;