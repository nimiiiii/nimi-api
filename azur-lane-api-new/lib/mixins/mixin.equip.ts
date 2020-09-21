export default class EquipMixin {
    id: number;
    name: string;
    type: number;
    nation: number;
    description: string;
    assetName: string;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        this.nation = data.nationality;
        this.description = data.descrip;
        this.assetName = data.icon;
    }
}