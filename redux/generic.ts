import {Action} from 'redux';
import { GeneralThunkDispatch, AppGetState } from './store';

export type ActionWithPayload = Action & {
  payload?: any;
};

export type GeneralThunkAction<Args> = (agrs: Args) => (dispatch: GeneralThunkDispatch, getState: AppGetState) => any;