import { BlockTypes } from "../components/Block/Types"
import {SortIoUser, PlayData, SinglePlayData, MultiPlayData} from './local'
import BuildConfig from 'react-native-config';
import { Item } from "../components/ItemList/ItemBox";

const {BUILD_ENV, API_BASE_LOCAL, API_BASE_ONLINE } = BuildConfig;
const API_BASE = BUILD_ENV === "DEV" ? API_BASE_LOCAL : API_BASE_ONLINE;

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

export const getCountryIconSvg = (lat: number, lng: number) => {
  const url = `${API_BASE}/country/icon`
  return fetch(`${url}?lat=${lat}&lng=${lng}`)
  .then((res)=> res.text())
  .catch((err) => {
    console.log(err);
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

export const isServerAlive = (): Promise<boolean> => {
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

export const configureSocket = () => {
  return new WebSocket(`${API_BASE}/match`)
}
