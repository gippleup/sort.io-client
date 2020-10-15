import { useSelector } from "react-redux"
import { AppState } from "../redux/store"

const useItems = () => {
  const items = useSelector((state: AppState) => state.items)
  return items;
}

export default useItems