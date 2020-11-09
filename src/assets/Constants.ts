import { Dimensions } from "react-native";

const Constants = {
  blockWidth: 66,
  stackMarginHorizontal: 10,
  stackMarginVertical: 10,
  boardPaddingHorizontal: 10,
  boardPaddingVertical: 10,
  blockPadding: 15,
  blockHeight: {
    top: 8,
    piece: 24,
    bottom: 34,
    full: 8 + 24 * 8 + 34,
    count: (pieceCount: number) => {
      return 8 + 34 + pieceCount * 24;
    },
  },
  maxStackLength: 8,
  minStackLength: 5,
  colorCount: 18,
};

export default Constants;
