import { SupportedSkin } from "@components/Block/skinMap";
import expressions from "@components/Profile/Expressions";
import { SupportedLanguage } from "@redux/actions/global/types";
import screenTranslation_ko from "./ko/screens";

export type CategoryTranslation = {
  all: string;
  skin: string;
  expression: string;
  etc: string;
}

export type SkinTranslation = {
  [T in SupportedSkin]: {
    title: string;
    description: string;
  }
}

export type ExpressionTranslation = {
  [T in keyof typeof expressions]: {
    title: string;
    description: string;
  }
}

export type QuestionSet = {
  title: string;
  content: string;
  cancel: string;
  exit: string;
}[];

export type ScreenTranslation = typeof screenTranslation_ko;

export type Translation = {
  category: CategoryTranslation;
  skin: SkinTranslation;
  expression: ExpressionTranslation;
  screens: ScreenTranslation;
  exitQuestion: QuestionSet;
}

const TranslationPack: {[T in SupportedLanguage]: Translation} = {
  [SupportedLanguage.ko]: require('./ko').default,
  [SupportedLanguage.en]: require('./en').default
}

export default TranslationPack;