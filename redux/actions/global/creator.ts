import {SupportedLanguage, GlobalReducerActionTypes} from './types';

export const setLanguage = (language: SupportedLanguage) => ({
  type: GlobalReducerActionTypes.SET_LANGUAGE,
  payload: language,
});
