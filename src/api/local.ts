import AsyncStorage from '@react-native-community/async-storage';
import CryptoJS from 'react-native-crypto-js'
import { SupportedSkin } from '../components/Block/skinMap';
import { SupportedExpression } from '../components/Profile/Expressions';

const publicKey = "GOTCHA";

export type SortIoUser = {
  id: number;
  isTemp: boolean;
  name: string;
  ticket: number;
  gold: number;
  googleId?: string;
  createdAt?: string;
  profileImg?: string;
}

export type SinglePlayData = {
  id: number;
  userId: number; //로컬로 플레이해서 userId가 없는 경우는 추후에 연결됐을 때 싹 필터링해서 업데이트하자.
  createdAt: string;
  difficulty: number;
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
  user: SortIoUser;
  singlePlay: SinglePlayData[];
  multiPlay: MultiPlayData[];
}

const encrypt = (str: string) => {
  const encrypted = CryptoJS.AES.encrypt(str, publicKey).toString();
  return encrypted;
}

const decrypt = (str: string) => {
  const bytes = CryptoJS.AES.decrypt(str, publicKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export const getLocalPlayData = (): Promise<PlayData> => {
  return new Promise ((resolve, reject) => {
    AsyncStorage.getItem('playData')
      .then((data) => {
        if (data) {
          const decrypted = decrypt(data);
          const decryptedData = JSON.parse(decrypted) as PlayData;
          resolve(decryptedData);
        } else {
          resolve(undefined);
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const setLocalPlayData = (data: PlayData) => {
  const encrypted = encrypt(JSON.stringify(data));
  return AsyncStorage.setItem('playData', encrypted);
}

export const setLocalData = (key: string, data: string): Promise<void> => {
  const encrypted = encrypt(data);
  return AsyncStorage.setItem(key, encrypted);
}

export const getLocalData = (key: string): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key)
      .then((data) => {
        if (data) {
          const decrypted = decrypt(data);
          resolve(decrypted);
        } else {
          resolve(undefined);
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}