import BlockStack from "./BlockStack";

class BoardSolver {
  stacks: BlockStack[];
  holdingBlock: null | number = null;
  constructor(rawMap: number[][]) {
    this.stacks = rawMap.map((rawStack) => new BlockStack(rawStack));
  }

  get completed(): boolean {
    const unfinished = this.stacks.map((stack) => !stack.isEmpty && !stack.finished)
    return unfinished.length === 0;
  }

  undock(stackIndex: number) {
    const removedBlock = this.stacks[stackIndex].remove();
    if (removedBlock !== undefined) {
      this.holdingBlock = removedBlock;
    }
  }

  dock(stackIndex: number) {
    const targetStack = this.stacks[stackIndex];
    if (this.holdingBlock && targetStack.isFull) {
      targetStack.add(this.holdingBlock);
      this.holdingBlock = null;
    }
  }
}

export default BoardSolver;