const Constants = {
  blockWidth: 66,
  blockPadding: 15,
  blockHeight: {
    top: 8,
    piece: 24,
    bottom: 34,
    full: 8 + 24 * 5 + 34,
    count: (pieceCount: number) => {
      return 8 + 34 + pieceCount * 24;
    },
  },
};

export default Constants;
