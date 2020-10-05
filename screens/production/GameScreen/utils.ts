import { EventArg } from "@react-navigation/native";

export type GameMode = 'single' | 'multi';
export type GameSubType = 'challenge' | 'training';

export enum GameLevel {
  Dust = 0,
  Stone = 3,
  Iron = 6,
  Bronze = 9,
  Silver = 12,
  Gold = 18,
  Platinum = 24,
  Diamond = 30,
  Master = 36,
  GrandMaster = 42,
  Challenger = 48,
  GrandChallenger = 54,
  Champion = 60,
  GrandChampion = 66,
  Demigod = 72,
  Omnia = 78,
  God = 84,
  Uno = 90,
  Nihil = 96,
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

export const getLevelString = (level: number) => {
  const levelEnumNum = _getLevelEnumNum(level);
  const levelEnumStr = GameLevel[levelEnumNum];
  const subLevel = level - levelEnumNum + 1;
  const levelStr = `${levelEnumStr} ${subLevel}`;
  return levelStr;
}

export const generateOptionByLevel = (level: number) => {
  const levelIndex = Math.min(getLevelIndex(level), 18);
  const levelStr = getLevelString(level);
  const levelEnumNum = _getLevelEnumNum(level);
  const map = {
    blockStackCount: levelIndex + 3,
    colorCount: levelIndex + 2,
    maxScore: levelIndex + 2,
    stackLengthMax: 8,
    stackLengthMin: Math.min(levelIndex + 2, 5),
    shuffleCount: 100,
  }
  // const map = {
  //   blockStackCount: 21,
  //   colorCount: 18,
  //   maxScore: 20,
  //   stackLengthMax: 8,
  //   stackLengthMin: 5,
  //   shuffleCount: 100,
  // }
  return {
    map,
    time: 120,
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

