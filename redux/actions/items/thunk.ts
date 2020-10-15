import { getItemList } from "../../../api/sortio";
import { GeneralThunkAction } from "../../generic";
import { updateItemList } from "./cretor";
import { checkUsageOfItems } from "./utils";

export const fetchItemList: GeneralThunkAction<void> = () => (dispatch, getState) => {
  const {playData, global} = getState();
  getItemList(playData.user.id)
    .then((itemList) => {
      dispatch(updateItemList(itemList))
    })
}