import { SupportedSkin } from '../../components/Block/skinMap';
import { SupportedExpression } from '../../components/Profile/Expressions';
import { ExpressionDirection, GlobalReducerActions } from '../actions/global/creator';
import {
  SupportedLanguage,
  GlobalReducerActionTypes,
} from '../actions/global/types';

export type GlobalReducerState = {
  language: SupportedLanguage;
  skin: SupportedSkin;
  expressions: {
    [T in ExpressionDirection]?: SupportedExpression;
  }
};

const initialState: GlobalReducerState = {
  language: SupportedLanguage.ko,
  skin: "basic",
  expressions: {
    top: "like",
    bottom: "trophy",
    right: "meh",
    left: "heart",
    center: "sad",
  }
};

const reducer = (state = initialState, action: GlobalReducerActions) => {
  const newState = {...state};
  if (action.type === GlobalReducerActionTypes.SET_LANGUAGE) {
    newState.language = action.payload;
  }

  if (action.type === GlobalReducerActionTypes.SET_SKIN) {
    newState.skin = action.payload;
  }

  if (action.type === GlobalReducerActionTypes.SET_EXPRESSION) {
    const {direction, name} = action.payload;
    Object.entries(newState.expressions)
      .map(([key, value]) => {
        if (value === name) {
          newState.expressions[key as ExpressionDirection] = undefined;
        }
      })
    newState.expressions[direction] = name;
  }

  return newState;
};

export default reducer;
