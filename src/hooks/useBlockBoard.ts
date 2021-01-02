import React from "react";
import BlockBoardModel, { BlockBoardOption } from "src/model/BlockBoardModel"

type UseBlockBoardReturnType = [
  BlockBoardModel,
  (stackIndex: number) => any,
  (stackIndex: number) => any
];

const useBlockBoard = (option: BlockBoardOption): UseBlockBoardReturnType => {
  const [board, setBoard] = React.useState(new BlockBoardModel(option));
  const dock = (stackIndex: number) => {
    board.dock(stackIndex);
    setBoard(new BlockBoardModel(board));
  };
  const undock = (stackIndex: number) => {
    board.undock(stackIndex);
    setBoard(new BlockBoardModel(board));
  };
  return [board, dock, undock];
}

export default useBlockBoard;