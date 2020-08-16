import AsyncStorage from '@react-native-community/async-storage';
import CryptoJS from 'react-native-crypto-js'
import { makeGuestId } from './sortio';

const publicKey = "GOTCHA";

export type SortIoUser = {
  id: number | null;
  name: string;
  isTemp: boolean;
  gold: number;
}

export type SinglePlayData = {
  id: number;
  userId: number; //로컬로 플레이해서 userId가 없는 경우는 추후에 연결됐을 때 싹 필터링해서 업데이트하자.
  hasWon: boolean;
  createdAt: string;
  difficulty: number;
  timeConsumed: number;
}

export type MultiPlayData = {
  id: number;
  user1: number;
  user2: number;
  winner: number;
  isDraw: boolean;
  createdAt: string;
  difficulty: number;
  timeConsumed: number;
}

export type PlayData = {
  user: SortIoUser | null;
  single: SinglePlayData[];
  multi: MultiPlayData[];
}

const encrypt = (str: string) => {
  const encrypted = CryptoJS.AES.encrypt(str, publicKey).toString();
  return encrypted;
}

const decrypt = (str: string) => {
  const bytes = CryptoJS.AES.decrypt(str, publicKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export const getPlayData = () => {
  return new Promise ((resolve, reject) => {
    AsyncStorage.getItem('playData')
      .then((data) => {
        if (data) {
          resolve(JSON.parse(decrypt(data)));
        } else {
          initializePlayData().then((data) => {
            resolve(data);
          });
        }
      })
  })
}

export const setPlayData = (data: PlayData) => {
  const encrypted = encrypt(JSON.stringify(data));
  return AsyncStorage.setItem('playData', encrypted);
}

export const initializePlayData = async () => {
  const serverGeneratedGuest = await makeGuestId();
  const tempOfflineUser = {
    id: null,
    gold: 0,
    isTemp: true,
    name: 'tempOfflineLogin',
  };
  
  const data: PlayData = {
    user: null,
    single: [],
    multi: [],
  }
  
  data.user = serverGeneratedGuest || tempOfflineUser;
  setPlayData(data);
  return data;
}
