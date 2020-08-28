import {
  PlayData,
  setLocalPlayData,
} from "../../api/local";
import { PlayDataActions } from "../actions/playData/creator";
import {
  UPDATE_PLAYDATA,
  UPDATE_USER,
  UPDATE_GOLD,
  UPDATE_MULTIPLAY,
  UPDATE_SINGLEPLAY,
  UPDATE_TICKET
} from "../actions/playData/types";

const initialState: PlayData & {loaded: boolean} = {
  multi: [],
  single: [],
  user: {
    gold: 500,
    id: null,
    isTemp: true,
    name: 'tempOfflineLogin',
    ticket: 3,
    googleId: undefined,
    items: "",
  },
  loaded: false,
};

const reducer = (state = initialState, action: PlayDataActions) => {
  let newState = {...state};
  if (action.type === UPDATE_PLAYDATA) {
    const data = action.payload;
    newState = {
      ...data,
      loaded: true,
    };
  }

  if (action.type === UPDATE_USER) {
    const user = action.payload;
    newState = {
      ...state,
      loaded: true,
      user,
    }
  }

  if (action.type === UPDATE_GOLD) {
    const newAmount = action.payload;
    newState.user.gold = newAmount;
  }

  if (action.type === UPDATE_TICKET) {
    const newAmount = action.payload;
    newState.user.ticket = newAmount;
  }

  if (action.type === UPDATE_SINGLEPLAY) {
    const newData = action.payload;
    newState.single = newData;
  }

  if (action.type === UPDATE_MULTIPLAY) {
    const newData = action.payload;
    newState.multi = newData;
  }

  if (state.loaded) {
    setLocalPlayData(newState);
  }

  return newState;
}

export default reducer;
