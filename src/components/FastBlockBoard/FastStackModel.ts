export class FastStackModel {
  stack: number[];
  constructor(stack: number[]) {
    this.stack = stack;
  }

  dock(newBlock: number): number[] {
    const {stack} = this;
    let blankSpaceIndex: null | number = null;
    stack.forEach((blockType, i) => {
      if (blockType === -1 && blankSpaceIndex === null) {
        blankSpaceIndex = i;
      }
    })
    if (typeof blankSpaceIndex === "number") {
      this.stack[blankSpaceIndex] = newBlock;
    }

    return this.stack;
  }

  undock(): number | null {
    const {stack} = this;
    let lastBlockIndex: null | number = null;
    stack.reverse().forEach((blockType, i) => {
      if (blockType !== -1 && lastBlockIndex === null) {
        lastBlockIndex = i;
      }
    })

    if (typeof lastBlockIndex === "number") {
      const undockedBlock = stack[lastBlockIndex];
      this.stack[lastBlockIndex] = -1;
      return undockedBlock;
    }

    return null;
  }
}