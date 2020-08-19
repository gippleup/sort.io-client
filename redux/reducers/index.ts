import {combineReducers} from 'redux';
import globalReducer from './global';
import playDataReducer from './playData';

const rootReducer = combineReducers({
  global: globalReducer,
  playData: playDataReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
