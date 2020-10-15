import { SupportedSkin } from "../../../components/Block/skinMap";
import { Item, ItemCategory } from "../../../components/ItemList/ItemBox";
import { SupportedExpression } from "../../../components/Profile/Expressions";
import { UPDATE_ITEMLIST } from "./types";

export const updateItemList = (itemList: (Item)[]) => ({
  type: UPDATE_ITEMLIST,
  payload: itemList,
})


export type ReduxItemPureActions = 
ReturnType<typeof updateItemList>;