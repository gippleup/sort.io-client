export const POST_OPTION: Partial<RequestInit> = {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
}

export const stringifyValues = (obj: Object) => {
  const entries = Object.entries(obj).map(([key, value]) => {
    return [key, JSON.stringify(value)];
  });
  const newObj = Object.fromEntries(entries)
  return newObj;
}

export enum SupportedDifficulty {
  easy = 'easy',
  normal = 'normal',
  hard = 'hard',
  expert = 'expert',
}

export const difficultyEnd: {
  [P in keyof typeof SupportedDifficulty]: number;
} = {
  easy: 20,
  normal: 40,
  hard: 100,
  expert: 200,
};

export const getPrevDifficulty = (difficulty: SupportedDifficulty) => {
  const difficulties = Object.values(SupportedDifficulty);
  if (difficulty === 'easy') {
    return difficulty;
  }
  for (let i = 0; i < difficulties.length; i += 1) {
    if (difficulty === difficulties[i]) {
      return difficulties[i - 1];
    }
  }
  return difficulty;
};

export const getNextDifficulty = (difficulty: SupportedDifficulty) => {
  const difficulties = Object.values(SupportedDifficulty);
  if (difficulty === 'expert') {
    return difficulty;
  }
  for (let i = 0; i < difficulties.length; i += 1) {
    if (difficulty === difficulties[i]) {
      return difficulties[i + 1];
    }
  }
  return difficulty;
};

export const prettyStage = (stageNum: number) => {
  let foundStage = false;
  let difficulty: SupportedDifficulty = SupportedDifficulty.easy;
  let leftStage = 0;
  let curStageOnDifficulty = 0;
  const difficultyEndEntries = Object.entries(difficultyEnd);
  difficultyEndEntries.forEach((difficultyInfo, i) => {
    const difficultyName = difficultyInfo[0] as SupportedDifficulty;
    const end = difficultyInfo[1];
    const prevEntry = difficultyEndEntries[i - 1];
    const difficultyStart = prevEntry ? prevEntry[1] + 1 : 1;
    if (foundStage) {
      return;
    }

    if (stageNum <= end) {
      foundStage = true;
      difficulty = difficultyName;
      curStageOnDifficulty = stageNum - difficultyStart;
      leftStage = end - stageNum;
    }
  });

  const stageDivider = 5;
  const bigStageNum = Math.floor(curStageOnDifficulty / stageDivider) + 1;
  const smallStageNum = (curStageOnDifficulty % stageDivider) + 1;
  const difficultyLength =
    difficultyEnd[difficulty] - difficultyEnd[getPrevDifficulty(difficulty)];
  const clearPercentage = (curStageOnDifficulty + 1) / difficultyLength;

  return {
    difficultyLength,
    difficulty,
    bigStageNum,
    smallStageNum,
    curStageOnDifficulty,
    leftStage,
    clearPercentage,
  };
};

export const prettyPercent = (rate: number, roundOn: number = 2) => {
  const magnifiedRate = Math.round(rate * 100 * Math.pow(10, roundOn));
  const stringifiedRate = String(magnifiedRate);
  const integer = stringifiedRate.slice(0, stringifiedRate.length - roundOn) || 0;
  const decimal = stringifiedRate.slice(
    stringifiedRate.length - roundOn,
    stringifiedRate.length,
  );
  const prettyRate = `${integer}.${decimal}`;
  return prettyRate;
};

export const getMaxFromArr = (arr: number[]) => arr.reduce((acc, ele) => acc < ele ? ele : acc)
export const getMinFromArr = (arr: number[]) => arr.reduce((acc, ele) => acc > ele ? ele : acc)

type InterpolateOption = {
  input: [number, number];
  output: [number, number];
}
export const interpolateNum = (x: number) => (option: InterpolateOption) => {
  const {input, output} = option;
  const [inputMin, inputMax] = input;
  const [outputMin, outputMax] = output;

  const xDiffInputMin = x - inputMin;

  const scale = (outputMax - outputMin) / (inputMax - inputMin);
  return outputMin + xDiffInputMin * scale;
}