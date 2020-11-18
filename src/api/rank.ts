import BuildConfig from 'react-native-config';

const {BUILD_ENV, API_BASE_LOCAL, API_BASE_ONLINE } = BuildConfig;
const API_BASE = BUILD_ENV === "DEV" ? API_BASE_LOCAL : API_BASE_ONLINE;

export type RawSingleRankData = {
  id: number;
  name: string;
  photo: string;
  createdAt: string;
  difficulty: string;
  rank: string;
  rate: string;
}

export type RawMultiRankData = {
  id: number,
  name: string,
  createdAt: string,
  gameCreatedAt: string,
  win: string,
  draw: string,
  lose: string,
  total: number,
  winningRate: number,
  KBI: number,
  rank: string,
  rate: string,
  photo: string,
}

export type RankData<T> = {
  targetUser: T;
  beforeTargetUser: T[];
  afterTargetUser: T[];
  total: number;
}

export const getSinglePlayRankByIdWithPadding = (userId: number, padding: number = 2, recent = 3650000): Promise<RankData<RawSingleRankData> | null> => {
  const url = `${API_BASE}/singlePlay/rank?userId=${userId}&padding=${padding}&recent=${recent}`;
  return fetch(url)
    .then((res) => res.json())
    .catch(() => null)
}

export const getSinglePlayRankById = (userId: number, recent?: number): Promise<RawSingleRankData | null> => {
  return getSinglePlayRankByIdWithPadding(userId, 0, recent)
    .then((json) => json ? json.targetUser : null)
    .catch(() => null)
}

export const getSinglePlayRankFromTo = (from: number, to: number, recent = 3650000): Promise<RawSingleRankData[] | null> => {
  const url = `${API_BASE}/singlePlay/rank?from=${from}&to=${to}&recent=${recent}`;
  return fetch(url)
    .then((res) => res.json())
    .catch((e) => null);
}

export const getMultiPlayRankByIdWithPadding = (userId: number, padding: number = 2, recent = 3650000): Promise<RankData<RawMultiRankData> | null> => {
  const url = `${API_BASE}/multiPlay/rank?userId=${userId}&padding=${padding}&recent=${recent}`;
  return fetch(url)
    .then((res) => res.json())
    .catch(() => null);
}

export const getMultiPlayRankById = (userId: number, recent?: number): Promise<RawMultiRankData | null> => {
  return getMultiPlayRankByIdWithPadding(userId, 0, recent)
    .then((json) => json ? json.targetUser : null)
    .catch(() => null);
}

export const getMultiPlayRankFromTo = (from: number, to: number, recent = 3650000): Promise<RawMultiRankData[] | null> => {
  const url = `${API_BASE}/multiPlay/rank?from=${from}&to=${to}&recent=${recent}`;
  return fetch(url)
    .then((res) => res.json())
    .catch((e) => null);
}