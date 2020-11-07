import { stack } from "d3";
import { FastStackModel } from "./FastStackModel";

export type FastStackStatus = "docked" | "undocked";

export type ActiveStackDescription = null | {
  index: number;
  status: FastStackStatus;
}

export type FastBoardStatus = {
  stacks: number[][];
  activeStack: ActiveStackDescription;
  holdingBlock: null | number;
}

export class FastBoardModel {
  stacks: FastStackModel[];
  activeStack: ActiveStackDescription;
  holdingBlock: null | number;
  constructor(boardStatus: FastBoardStatus) {
    const {activeStack, holdingBlock, stacks} = boardStatus;
    this.stacks = stacks.map((stackData) => new FastStackModel(stackData));
    this.activeStack = activeStack;
    this.holdingBlock = holdingBlock;
  }

  get boardStatus(): FastBoardStatus {
    return {
      activeStack: this.activeStack,
      holdingBlock: this.holdingBlock,
      stacks: this.stacks.map((model) => model.stack),
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
    const undockedBlock = this.stacks[stackIndex].undock();
    if (undockedBlock !== null) {
      this.activeStack = {
        index: stackIndex,
        status: "undocked",
      };
      this.holdingBlock = undockedBlock;
    }

    return this.boardStatus;
  }

  dock(stackIndex: number): FastBoardStatus {
    if (this.holdingBlock) {
      this.stacks[stackIndex].dock(this.holdingBlock);
      this.holdingBlock = null;
    }

    return this.boardStatus;
  }
}
