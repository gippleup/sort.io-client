import { getItemList } from "@api/item";
import { GeneralThunkAction } from "@redux/generic";
import { updateItemList } from "./cretor";

export const fetchItemList: GeneralThunkAction<void> = () => (dispatch, getState) => {
  const {playData, global} = getState();
  getItemList(playData.user.id)
    .then((itemList) => {
      dispatch(updateItemList(itemList))
    })
}