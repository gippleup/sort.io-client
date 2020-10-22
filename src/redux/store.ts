import {createStore, applyMiddleware} from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppDispatch = typeof store.dispatch;
export type AppGetState = typeof store.getState;
export type AppState = ReturnType<AppGetState>;
export type GeneralThunkDispatch = ThunkDispatch<any, any, any>;

export default store;
