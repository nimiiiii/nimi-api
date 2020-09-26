import ChatBubble from "./model.item.chat";
import ShareCfgModel from "../model.sharecfg.base";

@ShareCfgModel.dependsOn([ "itemIconFrames" ])
export default class IconFrame extends ChatBubble {}