import {
  SupportedLanguage,
  GlobalReducerActionTypes,
} from '../actions/global/types';

type GlobalReducerActon = {
  type: GlobalReducerActionTypes;
  payload: any;
};

type GlobalReducerState = {
  language: SupportedLanguage;
};

const initialState: GlobalReducerState = {
  language: SupportedLanguage.ko,
};

const reducer = (state = initialState, action: GlobalReducerActon) => {
  const newState = {...state};
  if (action.type === GlobalReducerActionTypes.SET_LANGUAGE) {
    newState.language = action.payload;
  }
  return newState;
};

export default reducer;
