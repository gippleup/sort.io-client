import { BlockTypes } from "../components/Block/Types"
import {SortIoUser, PlayData, SinglePlayData, MultiPlayData} from './local'

const dev = true;

const API_BASE = dev ? 'http://localhost:3000' : 'http://54.180.142.19:3000'

const POST_OPTION: Partial<RequestInit> = {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
}

type UserEntityProps = {
  id: number;
  name?: string;
  createdAt?: string;
  gold?: number;
  items?: string;
  isTemp?: boolean;
  profileImg?: string;
  ticket?: number;
  gooogleId?: string;
}

export const _dangerouslyUpdateServerData = (option: UserEntityProps) => {
  return fetch(`${API_BASE}/user/update`, {
    ...POST_OPTION,
    body: JSON.stringify(option),
  })
}

export const getCountryIconSvg = (lat: number, lng: number) => {
  const url = `${API_BASE}/country/icon`
  return fetch(`${url}?lat=${lat}&lng=${lng}`)
  .then((res)=> res.text())
  .catch((err) => console.log(err))
}

export const signUpWithGoogle = (googleId: number, userId: number, photo: string | null, name: string | null) => {
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

export type MapOption = {
  blockStackCount: number;
  stackLengthMax: number;
  stackLengthMin: number;
  maxScore: number;
  colorCount: number;
  shuffleCount?: number;
}


export const generateMap = (option: MapOption): Promise<{answer: BlockTypes[][], question: BlockTypes[][]}> => {
  const mappedQuery = Object.entries(option).map(([key, value]) => {
    return `${key}=${value}`;
  }).join('&');
  const url = `${API_BASE}/map/generate?${mappedQuery}`
  return fetch(url).then((res) => res.json());
}



export const makeGuestId = (): Promise<SortIoUser> => {
  const url = `${API_BASE}/user/guest/create`
  return fetch(url)
    .then((res) => {
      return res.json()
    })
    .catch((err) => {
      console.log(err);
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
        throw new Error('NO PLAY DATA FOUND ON SERVER');
      }
    })
    .catch((err) => {
      console.warn(err);
      return null;
    })
}

export const getPlayDataByGoogleId = (googleId: number): Promise<PlayData> => {
  const url = `${API_BASE}/user/playdata?googleId=${googleId}`
  return fetch(url)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error('NO PLAY DATA FOUND ON SERVER');
      }
    })
    .catch((err) => {
      console.warn(err);
      return null;
    })
}

export const setGold = (userId: number, newAmount: number): Promise<string> => {
  const url = `${API_BASE}/user/gold`;
  return fetch(url, {
    ...POST_OPTION,
    body: JSON.stringify({
      userId,
      newAmount
    }),
  })
    .then((res) => res.text())
    .catch((err) => 'fail')
}


export const setTicket = (userId: number, newAmount: number): Promise<string> => {
  const url = `${API_BASE}/user/ticket`;
  return fetch(url, {
    ...POST_OPTION,
    body: JSON.stringify({
      userId,
      newAmount
    }),
  })
    .then((res) => res.text())
    .catch((err) => 'fail')
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

export const isServerAlive = () => {
  const url = `${API_BASE}`;
  return new Promise((resolve) => {
    fetch(url)
      .then((res) => {
        if (res.ok) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(() => {
        resolve(false);
      })
  })
}

export type UserSingleRankData = {
  userId: number;
  name: string;
  difficulty: number;
  createdAt: string;
  rank: string;
  rate: string;
  photo: string;
}

export type UserMultiRankData = {
  id: number;
  name: string;
  createdAt: string;
  win: string;
  draw: string;
  lose: string;
  total: string;
  winningRate: string;
  KBI: number;
  rank: string;
  rate: string;
  photo: string;
}

export type RankData<T> = {
  targetUser: T;
  beforeTargetUser: T[];
  afterTargetUser: T[];
  total: number;
}

export const getSinglePlayRank = (userId: number, padding: number = 2): Promise<RankData<UserSingleRankData>> => {
  const url = `${API_BASE}/singlePlay/rank?userId=${userId}&padding=${padding}`;
  return fetch(url)
   .then((res) => res.json())
  .catch(() => null)
}

export const getMultiPlayRank = (userId: number, padding: number = 2): Promise<RankData<UserMultiRankData>> => {
  const url = `${API_BASE}/multiPlay/rank?userId=${userId}&padding=${padding}`;
  return fetch(url)
    .then((res) => res.json())
    .catch(() => null)
}

export const configureSocket = () => {
  return new WebSocket(`${API_BASE}/match`)
}