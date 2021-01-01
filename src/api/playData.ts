import BuildConfig from 'react-native-config';
import { SortIoUser, PlayData, SinglePlayData, MultiPlayData } from './local';
import { POST_OPTION } from './utils';

const {BUILD_ENV, API_BASE_LOCAL, API_BASE_ONLINE } = BuildConfig;
const API_BASE = BUILD_ENV === "DEV" ? API_BASE_LOCAL : API_BASE_ONLINE;

export const makeGuestId = (): Promise<SortIoUser> => {
  const url = `${API_BASE}/user/guest/create`
  return fetch(url)
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return null;
    });
}

export const getPlayDataByUserId = (userId: number): Promise<PlayData> => {
  const url = `${API_BASE}/user/playdata?userId=${userId}`
  return fetch(url)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        console.log('NO PLAY DATA FOUND ON SERVER');
      }
    })
    .catch((err) => {
      console.warn(err);
      return null;
    })
}

export const getPlayDataByGoogleId = (googleId: string): Promise<PlayData | null> => {
  const url = `${API_BASE}/user/playdata?googleId=${googleId}`
  return fetch(url)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.warn(err);
      return null;
    })
}

export type SaveSinglePlayOption = {
  userId: number,
  difficulty: number,
  createdAt: string
}

export const saveSinglePlayToServer = (option: SaveSinglePlayOption): Promise<SinglePlayData> => {
  const url = `${API_BASE}/singlePlay/save`;
  const {userId, difficulty, createdAt} = option;
  return fetch(url, {
    ...POST_OPTION,
    body: JSON.stringify({
      difficulty,
      userId,
      createdAt
    }),
  })
    .then((res) => res.json())
    .catch((err) => null)
}


export type SaveMultiPlayOption = {
  user1: number,
  user2: number,
  difficulty: number,
  timeConsumed: number,
  winner: number,
}

export const saveMultiPlayToServer = (option: SaveMultiPlayOption): Promise<MultiPlayData> => {
  const url = `${API_BASE}/match/save`;
  const {
    difficulty,
    timeConsumed,
    user1,
    user2,
    winner
  } = option;
  return fetch(url, {
    ...POST_OPTION,
    body: {
      winner,
      difficulty,
      user1, user2,
      timeConsumed,
    },
  })
  .then((res) => res.json())
  .catch((err) => null)
}

export const signUpWithGoogle = (googleId: string, userId: number, photo: string | null, name: string | null) => {
  return fetch(`${API_BASE}/user/signup`, {
    ...POST_OPTION,
    body: JSON.stringify({
      googleId,
      userId,
      photo,
      name,
    })
  })
    .then((res) => res.json())
    .catch((err) => null);
}

export type SinglePlay = {
  id: number;
  userId: number;
  createdAt: string;
  difficulty: number;
}

export type MultiPlay = {
  id: number;
  user1: number;
  user2: number;
  winner: number;
  difficulty: number;
  timeConsumed: number;
  createdAt: string;
}

export const getSinglePlayDataByUserId = (userId: number): Promise<SinglePlay[]> => {
  const url = `${API_BASE}/singlePlay?userId=${userId}`;
  return fetch(url)
    .then((res) => res.json())
    .catch(() => null)
}

export const getMultiPlayDataByUserId = (userId: number): Promise<MultiPlay[]> => {
  const url = `${API_BASE}/multiPlay?userId=${userId}`;
  return fetch(url)
    .then((res) => res.json())
    .catch(() => null)
}

