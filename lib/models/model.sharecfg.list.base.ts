import ShareCfgModel from "./model.sharecfg.base";

export default abstract class ShareCfgModelList<T extends ShareCfgModel> extends ShareCfgModel {
    entries : T[] = [];
}