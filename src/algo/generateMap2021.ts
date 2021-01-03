import { BlockTypes } from "@components/Block/Types";

export type MapOption = {
  blockStackCount: number;
  stackLengthMax: number;
  stackLengthMin: number;
  maxScore: number;
  colorCount: number;
  shuffleCount?: number;
}

export type GenerateMapReturnType = {
  question: BlockTypes[][];
  answer: BlockTypes[][];
}

export const generateMap = (mapOption: MapOption): GenerateMapReturnType => {
  const question = [[]];
  const answer = [[]];

  return {
    question,
    answer
  }
}

export default generateMap;
