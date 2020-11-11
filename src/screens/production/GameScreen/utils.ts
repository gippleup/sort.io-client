import { EventArg } from "@react-navigation/native";
import Constants from "../../../assets/Constants";

export type GameMode = 'single' | 'multi';
export type GameSubType = 'challenge' | 'training';

export enum GameLevel {
  Dust = 0,
  Stone = 3,
  Iron = 6,
  Bronze = 9,
  Silver = 12,
  Gold = 15,
  Platinum = 18,
  Diamond = 21,
  Master = 24,
  GrandMaster = 27,
  Challenger = 30,
  GrandChallenger = 33,
  Champion = 36,
  GrandChampion = 39,
  DemiGod = 42,
  God = 45,
  Atom = 48,
  Nihil = 51,
};

const _getLeveEnumNumArr = () => {
  return Object.keys(GameLevel)
    .filter((str) => str.match(/\d/g))
    .map((str) => Number(str));
}

const _getLevelEnumNum = (level: number) => {
  return _getLeveEnumNumArr()
    .filter((num) => num <= level)
    .reduce((acc, ele) => {
      if (ele > acc) return ele;
      return acc;
    })
}

export const getLevelIndex = (level: number) => {
  const levelEnumNumArr = _getLeveEnumNumArr();
  const levelEnumNum = _getLevelEnumNum(level);
  const levelIndex = levelEnumNumArr.indexOf(levelEnumNum);
  return levelIndex;
}

export const getSubLevel = (level: number): number => {
  if (level < 0) return 0;
  const levelEnumNum = _getLevelEnumNum(level);
  const subLevel = level - levelEnumNum + 1;
  return Math.min(subLevel, 6);
}

export const getLevelString = (level: number) => {
  if (level < 0) return GameLevel[0]
  const levelEnumNum = _getLevelEnumNum(level);
  const levelEnumStr = GameLevel[levelEnumNum];
  const subLevel = getSubLevel(level);
  const levelStr = `${levelEnumStr} ${subLevel}`;
  return levelStr;
}

export const generateOptionByLevel = (level: number) => {
  const levelIndex = Math.min(getLevelIndex(level), 18);
  const levelStr = getLevelString(level);
  const levelEnumNum = _getLevelEnumNum(level);
  const map = {
    blockStackCount: Math.floor(levelIndex * 1.5) + 3,
    colorCount: Math.min(levelIndex + 2, Constants.colorCount),
    maxScore: Math.floor(levelIndex * 1.5) + 2,
    stackLengthMax: 8,
    stackLengthMin: Math.min(levelIndex + 2, 5),
    shuffleCount: 100,
  }
  const subLevel = getSubLevel(level);
  return {
    map,
    time: 120 - 10 * (subLevel - 1),
    levelStr,
  };
}

export const findLastBoolean = (resultArr: (null | boolean)[]) => {
  let index = 0, value: null | boolean = false;
  for (let i = resultArr.length - 1; i > -1; i -= 1) {
    if (resultArr[i] !== null) {
      index = i;
      value = resultArr[i]
      break;
    }
  }
  return {
    index,
    value,
  }
}

export type BeforeRemoveEvent = EventArg<"beforeRemove", true, {
  action: Readonly<{
    type: string;
    payload?: object | undefined;
    source?: string | undefined;
    target?: string | undefined;
  }>
}>

