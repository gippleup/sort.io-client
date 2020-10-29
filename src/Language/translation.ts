import { SupportedSkin } from "../components/Block/skinMap";
import expressions from "../components/Profile/Expressions";
import { SupportedLanguage } from "../redux/actions/global/types";

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

export type Translation = {
  category: CategoryTranslation;
  skin: SkinTranslation;
  expression: ExpressionTranslation;
}

const TranslationPack: {[T in SupportedLanguage]: Translation} = {
  [SupportedLanguage.ko]: require('./ko').default,
  [SupportedLanguage.en]: require('./en').default
}

export default TranslationPack;