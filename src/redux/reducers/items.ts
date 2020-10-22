import { SupportedSkin } from "../../components/Block/skinMap";
import { Item, ItemCategory } from "../../components/ItemList/ItemBox";
import { SupportedExpression } from "../../components/Profile/Expressions";
import { ReduxItemPureActions } from "../actions/items/cretor";
import { UPDATE_ITEMLIST } from "../actions/items/types";

const initialState: Item[] = [];

const reducer = (state = initialState, action: ReduxItemPureActions) => {
  let newState = [...state];
  if (action.type === UPDATE_ITEMLIST) {
    newState = action.payload;
  }
  return newState;
}

export default reducer;