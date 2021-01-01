import { MapOption } from "@algo/generateMap";
import { BlockTypes } from "@components/Block/Types";
import BuildConfig from "react-native-config";
import generateMap_local from "@algo/generateMap";
const {BUILD_ENV, API_BASE_LOCAL, API_BASE_ONLINE } = BuildConfig;
const API_BASE = BUILD_ENV === "DEV" ? API_BASE_LOCAL : API_BASE_ONLINE;

export const generateMapFromServer = (option: MapOption): Promise<{answer: BlockTypes[][], question: BlockTypes[][]}> => {
  const mappedQuery = Object.entries(option).map(([key, value]) => {
    return `${key}=${value}`;
  }).join('&');
  const url = `${API_BASE}/map/generate?${mappedQuery}`
  return fetch(url).then((res) => res.json());
}

export const generateMapFromLocal = generateMap_local