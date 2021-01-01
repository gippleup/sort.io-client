import { Item } from "@components/ItemList/ItemBox";
import { ReduxItemPureActions } from "@redux/actions/items/cretor";
import { UPDATE_ITEMLIST } from "@redux/actions/items/types";

const initialState: Item[] = [];

const reducer = (state = initialState, action: ReduxItemPureActions) => {
  let newState = [...state];
  if (action.type === UPDATE_ITEMLIST) {
    newState = action.payload;
  }
  return newState;
}

export default reducer;