import { stack } from "d3";
import { FastStackModel } from "./FastStackModel";

export type FastStackStatus = "docked" | "undocked" | "neutral";

export type ActiveStackDescription = null | {
  index: number;
  status: FastStackStatus;
}

export type FastBoardStatus = {
  stacks: number[][];
  activeStack: ActiveStackDescription;
  holdingBlock: null | number;
  finished: boolean;
  score: number;
}

export class FastBoardModel {
  stacks: FastStackModel[];
  activeStack: ActiveStackDescription;
  holdingBlock: null | number;
  finished: boolean;
  constructor(boardStatus: FastBoardStatus) {
    const {activeStack, holdingBlock, stacks, finished, score} = boardStatus;
    this.stacks = stacks.map((stackData) => new FastStackModel(stackData));
    this.activeStack = activeStack;
    this.holdingBlock = holdingBlock;
    this.finished = finished;
  }

  get score() {
    return this.stacks
      .filter((stackModel) => stackModel.hasAnyBlock)
      .map((stackModel) => stackModel.isFinished)
      .filter((bool) => bool)
      .length;
  }
  
  get isFinished() {
    return this.stacks
      .filter((stackModel) => stackModel.hasAnyBlock)
      .map((stackModel) => stackModel.isFinished)
      .filter((bool) => !bool)
      .length === 0;
  }

  get boardStatus(): FastBoardStatus {
    return {
      activeStack: this.activeStack,
      holdingBlock: this.holdingBlock,
      stacks: this.stacks.map((stackModel) => stackModel.stack),
      finished: this.isFinished,
      score: this.score,
    };
  }

  touchStack(stackIndex: number): FastBoardStatus {
    if (this.activeStack === null) {
      return this.undock(stackIndex);
    } else if (this.activeStack.status === "docked") {
      return this.undock(stackIndex);
    } else if (this.activeStack.status === "undocked") {
      return this.dock(stackIndex);
    }

    return this.boardStatus;
  }

  undock(stackIndex: number): FastBoardStatus {
    const undockedBlock = this.stacks[stackIndex].tail;
    if (undockedBlock !== undefined) {
      this.activeStack = {
        index: stackIndex,
        status: "undocked",
      };
      this.holdingBlock = undockedBlock;
    }

    return this.boardStatus;
  }

  dock(stackIndex: number): FastBoardStatus {
    if (this.stacks[stackIndex].isFull) {
    } else if (this.holdingBlock !== null && this.activeStack !== null) {
      this.stacks[this.activeStack.index].removeTail();
      this.stacks[stackIndex].add(this.holdingBlock);
    }

    this.activeStack = {
      index: stackIndex,
      status: "docked",
    };
    this.holdingBlock = null;

    return this.boardStatus;
  }
}
