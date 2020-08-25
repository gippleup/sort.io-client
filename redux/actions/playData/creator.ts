import { LOAD_PLAYDATA, SAVE_PLAYDATA, SAVE_GOLD, SAVE_TICKET, USE_GOLD, USE_TICKET, SAVE_MULTIPLAY, UPDATE_PLAYDATA, UPDATE_USER } from "./types";
import { PlayData, SinglePlayData, MultiPlayData, getLocalPlayData, SortIoUser } from "../../../api/local";
import { Dispatch } from "redux";
import { AppGetState } from "../../store";
import { makeGuestId, getPlayDataByGoogleId, signUpWithGoogle, pushSinglePlayData } from "../../../api/sortio";
import { ThunkDispatch } from "redux-thunk";
import { googleSignIn, googleSignOut } from "../../../api/googleOAuth";
import NetInfo from '@react-native-community/netinfo';

type GeneralThunkDispatch = ThunkDispatch<any, any, any>;

export const loadPlayData = () => (dispatch: GeneralThunkDispatch, getState: AppGetState) => {
  getLocalPlayData()
    .then((data: PlayData) => {
      if (data) {
        dispatch(updatePlayData(data));
      } else {
        try {
          dispatch(applyGuestId())
        } catch (e) {
          console.log(e);
        }
      }

    })
    .catch((e) => {
      console.log(e);
    })
}

export const applyGuestId = () => (dispatch: Dispatch, getState: AppGetState) => {
  const curUser = getState().playData.user;
  if (!curUser.id) {
    makeGuestId().then((user) => {
      const mixedUser: SortIoUser = {
        ...curUser,
        id: user.id,
        name: user.name,
      }
      dispatch(updateUser(mixedUser))
    })
  }
}

export const signInWithGoogle = () => async (dispatch: GeneralThunkDispatch, getState: AppGetState) => {
  const internetConnected = await NetInfo.fetch().then((state) => state.isConnected);
  if (!internetConnected) return;

  let curData = getState().playData;
  let curUser = curData.user;

  if (!curUser.id) {
    await makeGuestId().then((user) => {
      const mixedUser: SortIoUser = {
        ...curUser,
        id: user.id,
        name: user.name,
      }
      dispatch(updateUser(mixedUser))
    })
  }

  curData = getState().playData;
  curUser = curData.user;
  if (!curUser.id) throw new Error('어어 이게 왜 이러지');

  const googleUser = await googleSignIn();
  if (!googleUser) return;
  
  const googleId = Number(googleUser.user.id);
  try {
    const savedServerData = await getPlayDataByGoogleId(googleId)
      .then((data) => console.log(data))
      .catch(() => {
        return null;
      });
    if (savedServerData) {
      dispatch(updatePlayData(savedServerData));
    } else {
      const mixedUser: SortIoUser = {
        ...curUser,
        googleId: googleId,
        name: googleUser.user.name || curUser.name,
        isTemp: false,
      }
      dispatch(updateUser(mixedUser));
      signUpWithGoogle(googleId, curUser.id);
      pushSinglePlayData(curData);
    }
  } catch (e) {
    console.log(e);
  }
}

export const signOutWithGoogle = () => async (dispatch: GeneralThunkDispatch, getState: AppGetState) => {
  const internetConnected = await NetInfo.fetch().then((state) => state.isConnected);
  if (!internetConnected) return;

  let curData = getState().playData;
  let curUser = curData.user;

  if (!curUser.googleId) return;

  try {
    await googleSignOut()
    const pureUser: SortIoUser = {
      ...curUser,
      googleId: undefined,
      isTemp: true,
      name: `guest${curUser.id}`
    };
    dispatch(updateUser(pureUser))
  } catch (err) {
    throw err;
  }
}

export const updateUser = (user: SortIoUser) => ({
  type: UPDATE_USER,
  payload: user,
})

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
  ReturnType<typeof updatePlayData>
  | ReturnType<typeof updateUser>
  | ReturnType<typeof savePlayData>
  | ReturnType<typeof saveGold>
  | ReturnType<typeof saveTicket>
  | ReturnType<typeof useGold>
  | ReturnType<typeof useTicket>
  | ReturnType<typeof saveSinglePlay>
  | ReturnType<typeof saveMultiPlay>