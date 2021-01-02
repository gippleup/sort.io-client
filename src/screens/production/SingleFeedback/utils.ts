import { extractRandomFromArray } from "@utils/array";
import TranslationPack from "@Language/translation";
import { SupportedLanguage } from "@redux/actions/global/types";
import { getLevelEnumNum, getLevelIndex } from "../GameScreen/utils";

export const getStageFeedback = (stage: number, lan = SupportedLanguage.en) => {
  const levelIndex = getLevelEnumNum(stage);
  const possibleFeedbacks = TranslationPack[lan].screens.SingleFeedback[levelIndex];
  const randomFeedback = extractRandomFromArray(possibleFeedbacks).pickedEle;
  return randomFeedback;
}