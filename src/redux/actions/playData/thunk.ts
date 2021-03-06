import { AppGetState } from "@redux/store";
import { getLocalPlayData, PlayData, SortIoUser, setBackupPlayData, getBackupPlayData } from "@api/local";
import { updatePlayData, updateUser, updateGold, updateTicket, updateSinglePlay, updateMultiPlay } from "./creator";
import * as itemApi from "@api/item";
import { googleSignIn, googleSignOut, getLoggedUser } from "@api/googleOAuth";
import NetInfo from '@react-native-community/netinfo'
import { GeneralThunkAction } from "@redux/generic";
import { updateItemList } from "@redux/actions/items/cretor";
import { saveGold, saveTicket } from "@api/item";
import { getPlayDataByUserId, makeGuestId, getPlayDataByGoogleId, signUpWithGoogle, saveSinglePlayToServer, SaveMultiPlayOption, saveMultiPlayToServer } from "@api/playData";
import { isServerAlive } from "@api/sortio";

const price = {
  ticket: 150,
}

const checkConnection = () => {
  return new Promise(async (resolve, reject) => {
    const isConnected = await NetInfo.fetch().then((state) => state.isConnected);
    const isServerOk = await isServerAlive();
  
    if (!isConnected) {
      reject(new Error("인터넷 연결 상태 불량"))
      return;
    }
    if (!isServerOk) {
      reject(new Error("서버 상태 불량"))
      return;
    }

    resolve(true);
  })
}

const _getCurDataCurUser = (getState: AppGetState) => {
  return {
    curData: getState().playData,
    curUser: getState().playData.user,
  }
}

export const loadPlayData: GeneralThunkAction<void> = () => (dispatch, getState) => {
  getLocalPlayData()
    .then((data) => {
      if (data && typeof data === "object" && data.user) {
        getPlayDataByUserId(data.user.id)
        .then((dataFromServer) => {
          if (dataFromServer) {
            dispatch(updatePlayData(dataFromServer || data));
            if (dataFromServer.user.googleId !== undefined) {
              dispatch(fetchGoogleProfile());
            }
          }
        });
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

export const fetchGoogleProfile: GeneralThunkAction<void> = () => (dispatch, getState) => {
  const {curData, curUser} = _getCurDataCurUser(getState);
  getLoggedUser()
    .then((googleUser) => {
      if (googleUser) {
        dispatch(updateUser({
          ...curUser,
          profileImg: googleUser.user.photo || undefined,
          name: googleUser.user.name || curUser.name,
        }))
      }
    })
}

export const applyGuestId: GeneralThunkAction<void> = () => async(dispatch, getState) => {
  const curUser = getState().playData.user;
  const playDataSavedOnLocalStorage = await getLocalPlayData();
  if (playDataSavedOnLocalStorage !== undefined) {
    dispatch(updatePlayData(playDataSavedOnLocalStorage));
  } else {
    makeGuestId().then((user) => {
      if (!curUser.googleId) {
        const mixedUser: SortIoUser = {
          ...curUser,
          id: user.id,
          name: user.name,
        }
        dispatch(updateUser(mixedUser))
      } else {
      }
    })
    .catch(() => {
    })
  }
}

export const signInWithGoogle: GeneralThunkAction<void> = () => async (dispatch, getState) => {
  const isConnectionOk = await checkConnection();
  if (!isConnectionOk) return;

  let {curData, curUser} = _getCurDataCurUser(getState)

  if (typeof curUser.id !== "number") {
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
  if (!curUser.id) console.log('어어 이게 왜 이러지');

  const googleUser = await googleSignIn();

  if (!googleUser) return;

  const googleId = googleUser.user.id;
  try {
    const savedServerData = await getPlayDataByGoogleId(googleId)
      .then((data) => data)
      .catch(() => {
        return null;
      });

    const savedCurData = await setBackupPlayData(curData);

    if (savedServerData) {
      dispatch(updatePlayData(savedServerData));
    } else {
      const mixedUser: SortIoUser = {
        ...curUser,
        googleId: googleId,
        name: googleUser.user.name || curUser.name,
        profileImg: googleUser.user.photo || undefined,
        isTemp: false,
      }
      dispatch(updateUser(mixedUser));
      const response = await signUpWithGoogle(googleId, curUser.id, googleUser.user.photo, googleUser.user.name)
    }
  } catch (e) {
    console.log(e);
  }
}

export const signOutWithGoogle: GeneralThunkAction<void> = () => async (dispatch, getState) => {
  const internetConnected = await NetInfo.fetch().then((state) => state.isConnected);
  if (!internetConnected) return;
  
  let {curData, curUser} = _getCurDataCurUser(getState);
  
  if (!curUser.googleId) return;
  
  try {
    await googleSignOut()
    const backedUpData = await getBackupPlayData();
    if (backedUpData) {
      dispatch(updatePlayData(backedUpData));
    } else {
      dispatch(applyGuestId());
    }
  } catch (err) {
    console.log(err);
  }
}

export const useGold: GeneralThunkAction<number> = (amount) => async (dispatch, getState) => {
  const isConnectionOk = await checkConnection();
  if (!isConnectionOk) return;

  const { curUser } = _getCurDataCurUser(getState);
  if (typeof curUser.id !== "number") return;
  const updated = await itemApi.useGold(curUser.id, amount);
  if (updated) {
    const newAmount = updated.gold;
    dispatch(updateGold(newAmount));
  }
}

export const depositGold: GeneralThunkAction<number> = (amount) => async (dispatch, getState) => {
  const isConnectionOk = await checkConnection();
  if (!isConnectionOk) return;
  const { curUser } = _getCurDataCurUser(getState);
  if (typeof curUser.id !== "number") return;
  const updated = await saveGold(curUser.id, amount);
  if (updated) {
    const newAmount = updated.gold;
    dispatch(updateGold(newAmount));
  }
}

export const useTicket: GeneralThunkAction<number> = (amount) => async (dispatch, getState) => {
  const isConnectionOk = await checkConnection();
  if (!isConnectionOk) return;

  const { curUser } = _getCurDataCurUser(getState);
  if (typeof curUser.id !== "number") return;
  const updated = await itemApi.useTicket(curUser.id, amount);
  if (updated) {
    const newAmount = updated.ticket;
    dispatch(updateTicket(newAmount));
  }
}

export const depositTicket: GeneralThunkAction<number> = (amount) => async (dispatch, getState) => {
  const isConnectionOk = await checkConnection();
  if (!isConnectionOk) return;

  const { curUser } = _getCurDataCurUser(getState);
  if (typeof curUser.id !== "number") return;
  const updated = await saveTicket(curUser.id, amount);
  if (updated) {
    const newAmount = updated.ticket;
    dispatch(updateTicket(newAmount));
  }
}

export const purchaseTicket: GeneralThunkAction<number> = (amount) => async (dispatch, getState) => {
  const isConnectionOk = await checkConnection();
  if (!isConnectionOk) return;
  
  dispatch(useGold(amount * price.ticket));
  dispatch(depositTicket(amount));
}

export const saveSinglePlay: GeneralThunkAction<number> = (difficulty) => async (dispatch, getState) => {
  const isConnectionOk = await checkConnection();
  if (!isConnectionOk) return;

  const {curData, curUser} = _getCurDataCurUser(getState);
  const createdAt = new Date(Date.now()).toISOString();
  const savedData = await saveSinglePlayToServer({ userId: curUser.id, difficulty, createdAt });
  const newData = curData.singlePlay.concat(savedData);
  dispatch(updateSinglePlay(newData));
}

export const saveMultiPlay: GeneralThunkAction<SaveMultiPlayOption> = (option) => async (dispatch, getState) => {
  const isConnectionOk = await checkConnection();
  if (!isConnectionOk) return;

  const { curData, curUser } = _getCurDataCurUser(getState);
  const savedData = await saveMultiPlayToServer(option);
  const newData = curData.multiPlay.concat(savedData);
  dispatch(updateMultiPlay(newData));
}

type ItemDef = {
  category: string;
  name: string;
}
export const purchaseItem: GeneralThunkAction<ItemDef> = (itemDef) => async (dispatch, getState) => {
  const isConnectionOk = await checkConnection();
  if (!isConnectionOk) return;
  
  const {global} = getState();
  const {curData, curUser} = _getCurDataCurUser(getState);
  if (typeof curUser.id !== "number") return;
  const {category, name} = itemDef;
  const updatedItemList = await itemApi.purchaseItem(
    curUser.id,
    category,
    name,
  );
  const updatedUser = await getPlayDataByUserId(curUser.id);
  if (updatedUser) {
    dispatch(updateGold(updatedUser.user.gold));
    dispatch(updateItemList(updatedItemList));
  }
}


export const fetchPlayData: GeneralThunkAction<void> = () => async(dispatch, getState) => {
  const isConnectionOk = await checkConnection();
  if (!isConnectionOk) return;

  const {curUser} = _getCurDataCurUser(getState);
  if (typeof curUser.id !== "number") return;
  const updatedUser = await getPlayDataByUserId(curUser.id);
  dispatch(updatePlayData(updatedUser));
}