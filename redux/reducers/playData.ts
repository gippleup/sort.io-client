import { PlayData, SortIoUser, setLocalPlayData } from "../../api/local";
import { PlayDataActions } from "../actions/playData/creator";
import { UPDATE_PLAYDATA, UPDATE_USER } from "../actions/playData/types";

const initialState: PlayData & {loaded: boolean} = {
  multi: [],
  single: [],
  user: {
    gold: 0,
    id: null,
    isTemp: true,
    name: 'tempOfflineLogin',
    ticket: 0,
    googleId: undefined,
    items: "",
  },
  loaded: false,
};

const reducer = (state = initialState, action: PlayDataActions) => {
  let newState = {...state};
  if (action.type === UPDATE_PLAYDATA) {
    const data = action.payload as PlayData;
    newState = {
      ...data,
      loaded: true,
    };
  }
  if (action.type === UPDATE_USER) {
    const user = action.payload as SortIoUser;
    newState = {
      ...state,
      loaded: true,
      user,
    }
  }
  
  if (state.loaded) {
    setLocalPlayData(newState);
  }

  console.log(newState);

  return newState;
}

export default reducer;
