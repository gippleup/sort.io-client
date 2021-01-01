import { Item } from "@components/ItemList/ItemBox";
import { SupportedExpression } from "@components/Profile/Expressions";
import { AppState } from "@redux/store";

export const checkUsageOfItems = (itemList: Item[], global: AppState["global"]) => {
  const listCheckedUsage = itemList.map((item) => {
    let isInUse = false;
    if (item.category === "expression") {
      isInUse = Object.values(global.expressions).indexOf(item.name as SupportedExpression) !== -1;
    } else if (item.category === "skin") {
      isInUse = global.skin === item.name;
    }
    return {
      ...item,
      isInUse,
    }
  })
  return listCheckedUsage;
}