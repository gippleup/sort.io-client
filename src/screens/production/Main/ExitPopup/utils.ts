import { pickRandomFromArray } from "@utils/array"
import TranslationPack from "@Language/translation";
import { SupportedLanguage } from "@redux/actions/global/types";

export const getRandomQuestionSet = (lan: SupportedLanguage = SupportedLanguage.en) => {
  const questionSet = TranslationPack[lan].exitQuestion;
  const randomSet = pickRandomFromArray(questionSet);
  return randomSet;
}