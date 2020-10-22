import { pickRandomFromArray } from "../../../../components/Block/utils"
import questionSet from "./questionSets";

export const getRandomQuestionSet = () => {
  const randomSet = pickRandomFromArray(questionSet);
  return randomSet;
}