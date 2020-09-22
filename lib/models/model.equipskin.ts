import Model from "./model.base";
import RequestError from "../requestError";
import EquipSkinMixin from "../mixins/mixin.equipskin";

export default class EquipSkin extends Model {
    private _skinId: number;

    constructor(skinId: number) {
        super();

        this._skinId = skinId;
    }

    async load(equipSkins: any) {
        let skin = equipSkins.find((s: any) => s.id == this._skinId);

        if (!skin) throw new RequestError(404, "Equipment skin not found");

        Object.assign(this, new EquipSkinMixin(skin));
    }
}