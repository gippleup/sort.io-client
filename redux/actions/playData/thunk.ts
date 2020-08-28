import { ThunkDispatch } from "redux-thunk";
import { AppGetState } from "../../store";
import { getLocalPlayData, PlayData, SortIoUser, SinglePlayData } from "../../../api/local";
import { updatePlayData, updateUser, updateGold, updateTicket, updateSinglePlay, updateMultiPlay } from "./creator";
import { Dispatch } from "redux";
import { makeGuestId, getPlayDataByGoogleId, signUpWithGoogle, pushSinglePlayData, setGold, setTicket, saveSinglePlayToServer, SaveSinglePlayOption, SaveMultiPlayOption, saveMultiPlayToServer, isServerAlive } from "../../../api/sortio";
import { googleSignIn, googleSignOut } from "../../../api/googleOAuth";
import NetInfo from '@react-native-community/netinfo'

const price = {
  ticket: 150,
}

type GeneralThunkDispatch = ThunkDispatch<any, any, any>;

const _getCurDataCurUser = (getState: AppGetState) => {
  return {
    curData: getState().playData,
    curUser: getState().playData.user,
  }
}

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

  let {curData, curUser} = _getCurDataCurUser(getState)

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

  let {curData, curUser} = _getCurDataCurUser(getState)

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

export const useGold = (amount: number) => async (dispatch: GeneralThunkDispatch, getState: AppGetState) => {
  const { curUser } = _getCurDataCurUser(getState);
  const isConnected = await NetInfo.fetch().then((state) => state.isConnected);
  const newAmount = curUser.gold - amount
  dispatch(updateGold(newAmount));
  if (isConnected && curUser.id) {
    setGold(curUser.id, newAmount);
  }
}

export const depositGold = (amount: number) => async (dispatch: GeneralThunkDispatch, getState: AppGetState) => {
  const { curUser } = _getCurDataCurUser(getState);
  const isConnected = await NetInfo.fetch().then((state) => state.isConnected);
  const newAmount = curUser.gold + amount
  dispatch(updateGold(newAmount));
  if (isConnected && curUser.id) {
    setGold(curUser.id, newAmount);
  }
}

export const useTicket = (amount: number) => async (dispatch: GeneralThunkDispatch, getState: AppGetState) => {
  const { curUser } = _getCurDataCurUser(getState);
  const isConnected = await NetInfo.fetch().then((state) => state.isConnected);
  const newAmount = curUser.ticket - amount
  dispatch(updateTicket(newAmount));
  if (isConnected && curUser.id) {
    setTicket(curUser.id, newAmount);
  }
}

export const depositTicket = (amount: number) => async (dispatch: GeneralThunkDispatch, getState: AppGetState) => {
  const { curUser } = _getCurDataCurUser(getState);
  const isConnected = await NetInfo.fetch().then((state) => state.isConnected);
  const newAmount = curUser.ticket + amount
  dispatch(updateTicket(newAmount));
  if (isConnected && curUser.id) {
    setTicket(curUser.id, newAmount);
  }
}

export const purchaseTicket = (amount: number) => async (dispatch: GeneralThunkDispatch, getState: AppGetState) => {
  dispatch(depositTicket(amount));
  dispatch(useGold(amount * price.ticket));
}

export const saveSinglePlay = (difficulty: number) => async (dispatch: GeneralThunkDispatch, getState: AppGetState) => {
  const {curData, curUser} = _getCurDataCurUser(getState);
  const isConnected = await NetInfo.fetch().then((state) => state.isConnected);
  const isServerOk = await isServerAlive();
  const createdAt = new Date(Date.now()).toISOString();
  const generatedData: SinglePlayData = {
    userId: curUser.id,
    difficulty,
    createdAt,
    id: null,
  }
  if (isConnected && isServerOk && curUser.id) {
    const savedData = await saveSinglePlayToServer({userId: curUser.id, difficulty, createdAt});
    const newData = curData.single.concat(savedData);
    dispatch(updateSinglePlay(newData));
  } else {
    const newData = curData.single.concat(generatedData);
    dispatch(updateSinglePlay(newData));
  }
}

export const saveMultiPlay = (option: SaveMultiPlayOption) => async (dispatch: GeneralThunkDispatch, getState: AppGetState) => {
  const { curData, curUser } = _getCurDataCurUser(getState);
  const isConnected = await NetInfo.fetch().then((state) => state.isConnected);
  if (!isConnected) return;

  const savedData = await saveMultiPlayToServer(option);
  const newData = curData.multi.concat(savedData);
  dispatch(updateMultiPlay(newData));
}