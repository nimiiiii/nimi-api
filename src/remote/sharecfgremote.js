const Remote = require("./base");

class ShareCfgRemote extends Remote {
    constructor(lang, repo) {
        super("/sharecfg", lang, repo);
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

        this.add("tasks", "task_data_template.json");
        this.add("codes", "name_code.json");
        this.add("monthlySignIn", "activity_month_sign.json");

        await super.init();
    }

    getLuaTable(script) {
        return script.substr(
            script.indexOf("= {") + 2,
            script.lastIndexOf("}")
        );
    }

    getMappedObject(obj) {
        if (obj.all)
            delete obj.all;

        return Object.values(obj);
    }
}

module.exports = ShareCfgRemote;