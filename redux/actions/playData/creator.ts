import { LOAD_PLAYDATA, SAVE_PLAYDATA, SAVE_GOLD, SAVE_TICKET, USE_GOLD, USE_TICKET, SAVE_MULTIPLAY, UPDATE_PLAYDATA } from "./types";
import { PlayData, SinglePlayData, MultiPlayData, getPlayData } from "../../../api/local";
import { Dispatch } from "redux";
import { AppGetState } from "../../store";

export const loadPlayData = () => (dispatch: Dispatch, getState: AppGetState) => {
  getPlayData().then((data) => {
    dispatch(updatePlayData(data));
  })  
}

export const updatePlayData = (data: PlayData) => ({
  type: UPDATE_PLAYDATA,
  payload: data,
})

export const savePlayData = (data: PlayData) => ({
  type: SAVE_PLAYDATA,
  payload: data,
})

export const saveGold = (saved: number) => ({
  type: SAVE_GOLD,
  payload: saved,
})

export const useGold = (used: number) => ({
  type: USE_GOLD,
  payload: used
})

export const saveTicket = (saved: number) => ({
  type: SAVE_TICKET,
  payload: saved,
})

export const useTicket = (used: number) => ({
  type: USE_TICKET,
  payload: used,
})

export const saveSinglePlay = (playData: SinglePlayData) => ({
  type: SAVE_PLAYDATA,
  payload: playData,
})

export const saveMultiPlay = (playData: MultiPlayData) => ({
  type: SAVE_MULTIPLAY,
  payload: playData,
})

export type PlayDataActions =
  ReturnType<typeof updatePlayData>;