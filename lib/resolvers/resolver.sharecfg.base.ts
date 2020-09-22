import Repository from "../github/github.repository";
import Resolver from "./resolver.base";

export default abstract class ShareCfgResolver extends Resolver {
    dependencies: DependencyDictionary;

    constructor(lang: string, repo: Repository) {
        super("/sharecfg", lang, repo);

        this.dependencies = {};
    }

    static DEFAULT_TRANSFORMER(obj: any) : any {
        if (obj.all)
            delete obj.all;

        return Object.values(obj);
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

        this.add("lang", "gameset_language_client.json", (o: any) => o);
        this.add("tasks", "task_data_template.json");
        this.add("codes", "name_code.json");
        this.add("monthlySignIn", "activity_month_sign.json");

        this.add("social", "activity_ins_template.json");
        this.add("socialNpc", "activity_ins_npc_template.json");
        this.add("socialNpcGroup", "activity_ins_ship_group_template.json");

        await super.init();

        for (let key of Object.keys(this.dependencies))
            await this.get(key);
    }

    /**
     * Map an argument name to a file for dependency resolving
     * @param key The argument name
     * @param file The file to be resolved
     * @param transform A function called to modify the resolved object before being passed
     */
    add(key: string, file: string, transform: Function = ShareCfgResolver.DEFAULT_TRANSFORMER) : void {
        this.dependencies[key] = { file, transform };
    }

    async resolve(loader: Function) : Promise<any[]> {
        // TODO: change array to a list of loader arguments
        return await Promise.all([].map(async (k: string) => await this.get(k)));
    }

    async get(key: string) {
        const { file, transform } = this.dependencies[key];

        if (file === undefined)
            throw new Error(`Cannot resolve dependency > ${this.constructor.name}:${key}`);

        return transform(await super.get(file));
    }
}

interface DependencyDictionary {
    [key: string] : { file: string, transform: Function }
}