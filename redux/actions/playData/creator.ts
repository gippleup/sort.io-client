import {
  UPDATE_GOLD,
  UPDATE_MULTIPLAY,
  UPDATE_PLAYDATA,
  UPDATE_SINGLEPLAY,
  UPDATE_TICKET,
  UPDATE_USER
} from "./types";

import {
  PlayData,
  SinglePlayData,
  MultiPlayData,
  SortIoUser
} from "../../../api/local";

export const updateUser = (user: SortIoUser) => ({
  type: UPDATE_USER,
  payload: user,
})

export const updatePlayData = (data: PlayData) => ({
  type: UPDATE_PLAYDATA,
  payload: data,
})

export const updateGold = (newAmount: number) => ({
  type: UPDATE_GOLD,
  payload: newAmount,
})

export const updateTicket = (newAmount: number) => ({
  type: UPDATE_TICKET,
  payload: newAmount,
})

export const updateSinglePlay = (newData: SinglePlayData[]) => ({
  type: UPDATE_SINGLEPLAY,
  payload: newData,
})

export const updateMultiPlay = (newData: MultiPlayData[]) => ({
  type: UPDATE_MULTIPLAY,
  payload: newData,
})

export type PlayDataActions = {
  type: typeof UPDATE_PLAYDATA;
  payload: PlayData;
} | {
  type: typeof UPDATE_USER;
  payload: SortIoUser;
} | {
  type: typeof UPDATE_GOLD;
  payload: number;
} | {
  type: typeof UPDATE_TICKET;
  payload: number;
} | {
  type: typeof UPDATE_SINGLEPLAY;
  payload: SinglePlayData[];
} | {
  type: typeof UPDATE_MULTIPLAY;
  payload: MultiPlayData[];
}