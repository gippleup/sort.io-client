import { Item } from "@components/ItemList/ItemBox";
import { UPDATE_ITEMLIST } from "./types";

export const updateItemList = (itemList: (Item)[]) => ({
  type: UPDATE_ITEMLIST,
  payload: itemList,
})


export type ReduxItemPureActions = 
ReturnType<typeof updateItemList>;