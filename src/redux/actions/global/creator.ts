import { SupportedSkin } from '@components/Block/skinMap';
import { SupportedExpression } from '@components/Profile/Expressions';
import {SupportedLanguage, GlobalReducerActionTypes} from './types';

export const setLanguage = (language: SupportedLanguage) => ({
  type: GlobalReducerActionTypes.SET_LANGUAGE,
  payload: language,
});

export const setSkin = (skin: SupportedSkin) => ({
  type: GlobalReducerActionTypes.SET_SKIN,
  payload: skin,
})

export type ExpressionDirection = 
  "top"
  | "bottom"
  | "center"
  | "left"
  | "right";

export const setExpression = (expression: SupportedExpression, direction: ExpressionDirection) => ({
  type: GlobalReducerActionTypes.SET_EXPRESSION,
  payload: {
    name: expression,
    direction,
  },
})

export const toggleAnimation = () => ({
  type: GlobalReducerActionTypes.TOGGLE_ANIMATION,
})


export type GlobalReducerActions = {
  type: GlobalReducerActionTypes.SET_EXPRESSION,
  payload: {
    name: SupportedExpression,
    direction: ExpressionDirection,
  },
} | {
  type: GlobalReducerActionTypes.SET_LANGUAGE,
  payload: SupportedLanguage,
} | {
  type: GlobalReducerActionTypes.SET_SKIN,
  payload: SupportedSkin,
} | {
  type: GlobalReducerActionTypes.TOGGLE_ANIMATION,
}