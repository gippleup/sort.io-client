import { FastBoardActions, FastBoardActionTypes } from "./action";
import { FastBoardModel, FastBoardStatus } from "./FastBoardModel";

export const FastBoardReducer = (state: FastBoardStatus, action: FastBoardActions): FastBoardStatus => {
  let newState = {...state};
  if (action.type === FastBoardActionTypes.TOUCH_BLOCK) {
    const model = new FastBoardModel({
      activeStack: state.activeStack,
      holdingBlock: state.holdingBlock,
      stacks: state.stacks.map((stack) => stack.slice(0)),
      finished: state.finished,
      score: state.score,
    });
    const touchedIndex = action.payload;
    newState = model.touchStack(touchedIndex);
  }
  return newState;
}
