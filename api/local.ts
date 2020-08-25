import AsyncStorage from '@react-native-community/async-storage';
import CryptoJS from 'react-native-crypto-js'

const publicKey = "GOTCHA";

export type SortIoUser = {
  id: number | null;
  name: string;
  isTemp: boolean;
  gold: number;
  ticket: number;
  items: string;
  googleId: number | undefined;
}

export type SinglePlayData = {
  id: null | number;
  userId: null | number; //로컬로 플레이해서 userId가 없는 경우는 추후에 연결됐을 때 싹 필터링해서 업데이트하자.
  createdAt: string;
  difficulty: number;
}

export type MultiPlayData = {
  id: null | number;
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

export const getLocalPlayData = (): Promise<PlayData> => {
  return new Promise ((resolve, reject) => {
    AsyncStorage.getItem('playData')
      .then((data) => {
        if (data) {
          const decryptedData = JSON.parse(decrypt(data)) as PlayData;
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
