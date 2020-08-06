import {Action} from 'redux';

export type ActionWithPayload = Action & {
  payload?: any;
};
