import { LayoutRectangle } from "react-native";
import Constants from "../../assets/Constants";

const stackHeight = Constants.blockHeight.full;
const stackWidth = Constants.blockWidth;
const {
  stackMarginHorizontal,
  stackMarginVertical,
  boardPaddingHorizontal,
  boardPaddingVertical,
} = Constants;

export const getStackLayout = (layout: Pick<LayoutRectangle, "height" | "width">, stackCount: number) => {
  let stackLayout = {
    row: -1,
    column: -1,
    scale: -1,
    stackMarginHorizontal: -1,
    stackMarginVertical: -1,
    boardPaddingHorizontal: -1,
    boardPaddingVertical: -1,
  };

  let stackSpace = {
    width: stackWidth + stackMarginHorizontal * 2,
    height: stackHeight + stackMarginVertical * 2,
  };

  let foundFitScale = false;
  let scale = 1;  
  while(!foundFitScale) {
    const availableWidth = layout.width - boardPaddingHorizontal * 2 * scale;
    const availableHeight = layout.height - boardPaddingVertical * 2 * scale;
    const scaledStackSpaceWidth = stackSpace.width * scale;
    const scaledStackSpaceHeight = stackSpace.height * scale;
    const possibleColumnCount = Math.floor(availableWidth / scaledStackSpaceWidth);
    const possibleRowCount = Math.floor(availableHeight / scaledStackSpaceHeight);
    const availableCell = possibleColumnCount * possibleRowCount;
    if (availableCell < stackCount) {
      scale -= 0.01;
    } else {
      const requiredColumn = Math.min(possibleColumnCount, stackCount);
      const requiredRow = Math.ceil(stackCount / requiredColumn);
      foundFitScale = true;
      stackLayout = {
        scale,
        boardPaddingHorizontal: boardPaddingHorizontal * scale,
        boardPaddingVertical: boardPaddingVertical * scale,
        column: requiredColumn,
        row: requiredRow,
        stackMarginHorizontal: stackMarginHorizontal * scale,
        stackMarginVertical: stackMarginVertical * scale
      }
    }
  }

  return stackLayout;
}


