import { BlockTypes } from "../components/Block/Types"
import {SortIoUser} from './local'

const API_BASE = 'http://ec2-3-34-99-63.ap-northeast-2.compute.amazonaws.com:3000'

export const getCountryIconSvg = (lat: number, lng: number) => {
  const url = `${API_BASE}/country/icon`
  return fetch(`${url}?lat=${lat}&lng=${lng}`)
  .then((res)=> res.text())
  .catch((err) => console.log(err))
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
    .then((res) => res.json())
    .catch((err) => null);
}

