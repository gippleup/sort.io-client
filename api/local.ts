import AsyncStorage from '@react-native-community/async-storage';
import CryptoJS from 'react-native-crypto-js'
import { makeGuestId } from './sortio';

const publicKey = "GOTCHA";

export type SortIoUser = {
  id: number | null;
  name: string;
  isTemp: boolean;
  gold: number;
  ticket: number;
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
  user: SortIoUser;
  single: SinglePlayData[];
  multi: MultiPlayData[];
}

const subscriber: Function[] = [];

const encrypt = (str: string) => {
  const encrypted = CryptoJS.AES.encrypt(str, publicKey).toString();
  return encrypted;
}

const decrypt = (str: string) => {
  const bytes = CryptoJS.AES.decrypt(str, publicKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export const getPlayData = (): Promise<PlayData> => {
  return new Promise ((resolve, reject) => {
    AsyncStorage.getItem('playData')
      .then((data) => {
        if (data) {
          const decryptedData = JSON.parse(decrypt(data));
          resolve(decryptedData);
          subscriber.forEach((callback) => callback(decryptedData))
        } else {
          initializePlayData().then((data) => {
            resolve(data);
            subscriber.forEach((callback) => callback(data));
          });
        }
      })
  })
}

export const setPlayData = (data: PlayData) => {
  subscriber.forEach((callback) => callback(data))
  const encrypted = encrypt(JSON.stringify(data));
  return AsyncStorage.setItem('playData', encrypted);
}

export const initializePlayData = async (): Promise<PlayData> => {
  const serverGeneratedGuest = await makeGuestId();
  const tempOfflineUser = {
    id: null,
    gold: 0,
    isTemp: true,
    name: 'tempOfflineLogin',
    ticket: 0,
  };
  
  const data: PlayData = {
    user: serverGeneratedGuest || tempOfflineUser,
    single: [],
    multi: [],
  }
  
  setPlayData(data);
  return data;
}

export const modifyGold = (amount: number) => {
  return getPlayData().then((data) => {
    const curGold = data.user.gold;
    setPlayData({
      ...data,
      user: {
        ...data.user,
        gold: curGold + amount,
      }
    })
  })
}

export const modifyTicket = (amount: number) => {
  return getPlayData().then((data)=> {
    const curTicket = data.user.ticket;
    setPlayData({
      ...data,
      user: {
        ...data.user,
        ticket: curTicket + amount,
      }
    })
  })
}

export const useGold = (amount: number) => modifyGold(-amount);
export const saveGold = (amount: number) => modifyGold(amount);

export const useTicket = (amount: number) => modifyTicket(-amount);
export const saveTicket = (amount: number) => modifyTicket(amount);

export const clearPlayData = () => {
  return AsyncStorage.removeItem('playData');
}

export const subscribePlayData = (callback: (data: PlayData) => any) => {
  subscriber.push(callback);
}
