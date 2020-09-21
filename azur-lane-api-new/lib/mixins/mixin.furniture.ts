import ItemMixin from "./mixin.item";

export default class FurnitureMixin extends ItemMixin {
    description: string;
    type: number;

    constructor(data) {
        super(data);

        this.description = data.describe;
        this.type = data.type;
    }
}