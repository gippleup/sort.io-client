import { BlockTypes } from "../components/Block/Types"
import {SortIoUser, PlayData, SinglePlayData, MultiPlayData} from './local'

const API_BASE = 'http://54.180.142.19:3000'

const POST_OPTION: Partial<RequestInit> = {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
}

export const getCountryIconSvg = (lat: number, lng: number) => {
  const url = `${API_BASE}/country/icon`
  return fetch(`${url}?lat=${lat}&lng=${lng}`)
  .then((res)=> res.text())
  .catch((err) => console.log(err))
}

export const signUpWithGoogle = (googleId: number, userId: number) => {
  return fetch(`${API_BASE}/user/signup`, {
    ...POST_OPTION,
    body: JSON.stringify({
      googleId,
      userId,
    })
  })
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
      return res.json();
    })
    .catch((err) => {
      console.log(err);
      return null;
    })
}

export const getPlayDataByGoogleId = (googleId: number): Promise<PlayData> => {
  const url = `${API_BASE}/user/playdata?googleId=${googleId}`
  return fetch(url)
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
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

export type UserRankData = {
  userId: number;
  name: string;
  difficulty: number;
  createdAt: string;
  rank: string;
  rate: string;
}

export type RankData = {
  targetUser: UserRankData;
  beforeTargetUser: UserRankData[];
  afterTargetUser: UserRankData[];
  total: number;
}

export const getRank = (userId: number, padding: number = 2): Promise<RankData> => {
  const url = `${API_BASE}/user/rank?userId=${userId}&padding=${padding}`;
  return fetch(url)
  .then((res) => res.json())
  .catch(() => null)
}