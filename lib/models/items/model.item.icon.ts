import ChatBubble from "./model.item.chat";
import { dependsOn } from "../model.helpers";

@dependsOn([ "itemIconFrames" ])
export default class IconFrame extends ChatBubble {}