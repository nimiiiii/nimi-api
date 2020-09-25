import Model from "lib/models/model.base";
import Repository from "../github/github.repository";
import Resolver from "./resolver.base";

type Transformer = (o: unknown) => unknown;

export default class ShareCfgResolver extends Resolver {
    dependencies: Map<string, [string, Transformer]>;

    constructor(lang: string, repo: Repository) {
        super("/sharecfg", lang, repo);

        this.dependencies = new Map<string, [string, Transformer]>();
    }

    static DEFAULT_TRANSFORMER(obj: { all: number[] }) : unknown {
        if (obj.all)
            delete obj.all;

        return Object.values(obj);
    }

    async init() : Promise<void> {
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

        this.add("lang", "gameset_language_client.json", (o: unknown) => o);
        this.add("tasks", "task_data_template.json");
        this.add("codes", "name_code.json");
        this.add("monthlySignIn", "activity_month_sign.json");

        this.add("social", "activity_ins_template.json");
        this.add("socialNpc", "activity_ins_npc_template.json");
        this.add("socialNpcGroup", "activity_ins_ship_group_template.json");

        await super.init();
    }

    /**
     * Map an argument type to a file for dependency resolving
     * @param type The argument type
     * @param file The file to be resolved
     * @param transform A function called to modify the resolved object before being passed
     */
    add(type: string, file: string, transform = ShareCfgResolver.DEFAULT_TRANSFORMER) : void {
        this.dependencies.set(type, [file, transform]);
    }

    async resolve(model: Model) : Promise<any[]> {
        const dependencies : string[] = Reflect.getMetadata("dependencies", (<Object>model).constructor);

        return await Promise.all(
            (dependencies)
                ? dependencies.map(async (k: string) => await this.get(k))
                : []
        );
    }

    async get(type: string) : Promise<any> {
        const [ file, transform ] = this.dependencies.get(type) ?? [];

        if (file === undefined)
            throw new Error(`Cannot resolve dependency > ${this.constructor.name}:${type}`);

        return transform(await super.get(file));
    }
}