import {combineReducers} from 'redux';
import global from './global';
import playData from './playData';
import items from './items';

const rootReducer = combineReducers({
  global,
  playData,
  items,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
