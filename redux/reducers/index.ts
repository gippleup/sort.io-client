import {combineReducers} from 'redux';
import globalReducer from './global';

const rootReducer = combineReducers({
  global: globalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
