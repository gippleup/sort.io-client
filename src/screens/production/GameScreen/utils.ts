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

export const getLevelEnumNum = (level: number): GameLevel => {
  return _getLeveEnumNumArr()
    .filter((num) => num <= level)
    .reduce((acc, ele) => {
      if (ele > acc) return ele;
      return acc;
    })
}

export const getLevelIndex = (level: number) => {
  const levelEnumNumArr = _getLeveEnumNumArr();
  const levelEnumNum = getLevelEnumNum(level);
  const levelIndex = levelEnumNumArr.indexOf(levelEnumNum);
  return levelIndex;
}

export const getSubLevel = (level: number): number => {
  if (level < 0) return 0;
  const levelEnumNum = getLevelEnumNum(level);
  const subLevel = level - levelEnumNum + 1;
  return Math.min(subLevel, 3);
}

const levelColor: {[T in GameLevel]: string} = {
  [GameLevel.Atom]: "purple",
  [GameLevel.Bronze]: "darkgoldenrod",
  [GameLevel.Challenger]: "deepskyblue",
  [GameLevel.Champion]: "firebrick",
  [GameLevel.DemiGod]: "darkmagenta",
  [GameLevel.Diamond]: "azure",
  [GameLevel.Dust]: "grey",
  [GameLevel.God]: "lightgreen",
  [GameLevel.Gold]: "gold",
  [GameLevel.GrandChallenger]: "indigo",
  [GameLevel.GrandChampion]: "darkred",
  [GameLevel.GrandMaster]: "darkviolet",
  [GameLevel.Iron]: "darkgrey",
  [GameLevel.Master]: "blueviolet",
  [GameLevel.Nihil]: "black",
  [GameLevel.Platinum]: "lightsteelblue",
  [GameLevel.Silver]: "silver",
  [GameLevel.Stone]: "lightslategrey",
}

export const getLevelString = (level: number) => {
  if (level < 0) return GameLevel[0]
  const levelEnumNum = getLevelEnumNum(level);
  const levelEnumStr = GameLevel[levelEnumNum];
  const subLevel = getSubLevel(level);
  const levelStr = `${levelEnumStr} ${subLevel}`;
  return levelStr;
}

export const getTotalLevel = () => {
  return GameLevel["Nihil"] + 3;
}

export const getLevelColor = (level: number) => {
  if (level < 0) return GameLevel[0]
  const levelEnumNum = getLevelEnumNum(level);
  return levelColor[levelEnumNum];
}

export const generateOptionByLevel = (level: number) => {
  const levelIndex = Math.min(getLevelIndex(level), 18);
  const levelStr = getLevelString(level);
  const levelEnumNum = getLevelEnumNum(level);
  const blockStackCount = Math.ceil(levelIndex * 0.5) + 3;
  const map = {
    blockStackCount,
    colorCount: Math.min(blockStackCount - 1, Constants.colorCount),
    maxScore: blockStackCount - 1,
    stackLengthMax: 7,
    stackLengthMin: Math.min(levelIndex + 2, 5),
    shuffleCount: 100,
  }
  const subLevel = getSubLevel(level);
  const mainLevelTimeDiff = 2;
  const subLevelTimeDiff = mainLevelTimeDiff / 2;
  const minTime = levelIndex * mainLevelTimeDiff - subLevelTimeDiff * (subLevel - 1);
  const time = 50 - minTime;
  return {
    map,
    time: time,
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

