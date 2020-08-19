import { PlayData } from "../../api/local";
import { PlayDataActions } from "../actions/playData/creator";
import { UPDATE_PLAYDATA } from "../actions/playData/types";

const initialState: PlayData & {loaded: boolean} = {
  multi: [],
  single: [],
  user: {
    gold: 0,
    id: null,
    isTemp: true,
    name: 'tempOfflineLogin',
    ticket: 0,
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
  return newState;
}

export default reducer;
