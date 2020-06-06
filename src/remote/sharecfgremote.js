const Remote = require("./remote");

class ShareCfgRemote extends Remote {
    constructor(repo) {
        super("/sharecfg", repo);
    }

    async init() {
        this.add("ships", "ship_data_template.lua");
        this.add("shipStats", "ship_data_statistics.lua");
        this.add("shipSkins", "ship_skin_template.lua");
        this.add("shipSkinsDialogue", "ship_skin_words.lua");
        this.add("shipSkinsDialogueExtra", "ship_skin_words_extra.lua");
        this.add("shipGroups", "ship_data_group.lua");
        this.add("shipSkills", "skill_data_template.lua");
        this.add("shipBreakouts", "ship_data_breakout.lua");
        this.add("shipRetrofits", "ship_data_trans.lua");
        this.add("shipRetrofitTasks", "transform_data_template.lua");
        this.add("shipBlueprints", "ship_data_blueprint.lua");

        this.add("equip", "equip_data_template.lua");
        this.add("equipStats", "equip_data_statistics.lua");
        this.add("equipSkins", "equip_skin_template.lua");

        this.add("items", "item_data_statistics.lua");
        this.add("itemPlayerResources", "player_resource.lua");

        this.add("tasks", "task_data_template.lua");

        this.add("codes", "name_code.lua");

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