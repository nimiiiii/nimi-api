import RequestError from "lib/requestError";
import Model from "./model.base";

export default class Skill extends Model {
    id: number;
    name: string;
    type: number;
    description: string;
    descriptionValues: string[];

    constructor(id: number) {
        super();

        this.id = id;
    }

    async load(skills: any[]): Promise<void> {
        const skill = skills.find(s => s.id == this.id);

        if (!skill)
            throw new RequestError(404, "Skill not found.");

        this.name = skill.name.trim();
        this.type = skill.type;
        this.description = skill.desc;
        this.descriptionValues = (skill.desc_add[0])
            ? skill.desc_add[0].map(e => e[0])
            : [];
    }
}