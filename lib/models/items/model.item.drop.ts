/*
 * Copyright 2019 - 2020 Nathan Alo, Ayane Satomi, et al.
 * Licensed under the GNU General Public License v3
 * See LICENSE for details.
 */
import ChatBubble from "./model.item.chat";
import EquipmentItem from "./model.item.equip";
import EquipmentSkin from "../equipment/model.equip.skin";
import Furniture from "./model.item.furniture";
import IconFrame from "./model.item.icon";
import Item from "./model.item";
import Resource from "./model.item.resource";
import ShareCfgModel from "../model.sharecfg.base";
import ShipItem from "./model.item.ship";
import ShipSkinListItem from "../ships/model.ship.skin.list.item";

enum DropType {
    Resource = 1,
    Item,
    Equipment,
    Ship,
    Furniture,
    Strategy,
    ShipSkin,
    VItem,              // ???
    EquipmentSkin,
    ShipNPC,
    WorldItem = 12,
    IconFrame = 14,
    ChatFrame,
    Emoji = 17
}

export default class DropItem extends ShareCfgModel {
    type: DropType;
    item: ShareCfgModel;

    constructor(id: number, type: DropType) {
        super();

        this.type = type;

        switch (type) {
            case DropType.Resource:
                this.item = new Resource(id);
                break;

            case DropType.Item:
                this.item = new Item(id);
                break;

            case DropType.Equipment:
                this.item = new EquipmentItem(id);
                break;

            case DropType.Ship:
                this.item = new ShipItem(id);
                break;

            case DropType.Furniture:
                this.item = new Furniture(id);
                break;

            case DropType.EquipmentSkin:
                this.item = new EquipmentSkin(id);
                break;

            case DropType.ShipSkin:
                this.item = new ShipSkinListItem(id);
                break;

            case DropType.ChatFrame:
                this.item = new ChatBubble(id);
                break;

            case DropType.IconFrame:
                this.item = new IconFrame(id);
                break;
        }
    }
}