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

export const prettyPercent = (percentage: number) => {
  const percentMulitipliedBy100 = String(percentage * 10000);
  const integer = percentMulitipliedBy100.slice(0, 2);
  const decimal = percentMulitipliedBy100.slice(2, 4);
  const result = `${integer}.${decimal}`;
  return result;
};
