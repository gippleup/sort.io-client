import {SortIoUser, PlayData, SinglePlayData, MultiPlayData} from './local'
import BuildConfig from 'react-native-config';
import { Item } from "@components/ItemList/ItemBox";
import { POST_OPTION } from "./utils";

const {BUILD_ENV, API_BASE_LOCAL, API_BASE_ONLINE } = BuildConfig;
const API_BASE = BUILD_ENV === "DEV" ? API_BASE_LOCAL : API_BASE_ONLINE;

export const getItemList = (userId: number): Promise<Item[]> => {
  const url = `${API_BASE}/user/purchase?userId=${userId}`;
  return fetch(url)
    .then((res) => res.json())
    .catch(() => null);
}

export const purchaseItem = (userId: number, category: string, name: string) => {
  const url = `${API_BASE}/user/purchase`;
  return fetch(url, {
    ...POST_OPTION,
    body: JSON.stringify({
      userId,
      category,
      name,
    })
  })
    .then((res) => res.json())
    .catch(() => []);
}


export const useGold = (userId: number, amount: number): Promise<SortIoUser | null> => {
  const url = `${API_BASE}/user/gold`;
  return fetch(url, {
    ...POST_OPTION,
    body: JSON.stringify({
      type: "USE",
      userId,
      amount,
    }),
  })
    .then((res) => res.json())
    .catch((err) => null)
}

export const saveGold = (userId: number, amount: number): Promise<SortIoUser | null> => {
  const url = `${API_BASE}/user/gold`;
  return fetch(url, {
    ...POST_OPTION,
    body: JSON.stringify({
      type: "SAVE",
      userId,
      amount,
    }),
  })
    .then((res) => res.json())
    .catch((err) => null)
}


export const useTicket = (userId: number, amount: number): Promise<SortIoUser | null> => {
  const url = `${API_BASE}/user/ticket`;
  return fetch(url, {
    ...POST_OPTION,
    body: JSON.stringify({
      type: "USE",
      userId,
      amount
    }),
  })
    .then((res) => res.json())
    .catch((err) => 'fail')
}

export const saveTicket = (userId: number, amount: number): Promise<SortIoUser | null> => {
  const url = `${API_BASE}/user/ticket`;
  return fetch(url, {
    ...POST_OPTION,
    body: JSON.stringify({
      type: "SAVE",
      userId,
      amount
    }),
  })
    .then((res) => res.json())
    .catch((err) => 'fail')
}
