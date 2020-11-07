export class FastStackModel {
  stack: number[];
  constructor(stack: number[]) {
    this.stack = stack;
  }

  get isFinished(): boolean {
    return this.isFull && this.hasAllSameColor;
  }

  get isFull(): boolean {
    return this.stack.filter((type) => type === -1).length === 0;
  }

  get hasAnyBlock(): boolean {
    return this.stack.filter((type) => type !== -1).length !== 0;
  }

  get hasAllSameColor(): boolean {
    for (let i = 0; i < this.stack.length; i += 1) {
      if (this.stack[i] !== this.stack[0]) {
        return false;
      }
    }

    return true;
  }

  get tailIndex(): number | undefined {
    const {stack} = this;
    let lastBlockIndex: undefined | number = undefined;
    const reversedStack = stack.slice(0).reverse();
    reversedStack.forEach((blockType, i) => {
      if (blockType !== -1 && lastBlockIndex === undefined) {
        lastBlockIndex = i;
      }
    })

    if (typeof lastBlockIndex === "number") {
      return stack.length - 1 - lastBlockIndex;
    }

    return lastBlockIndex;
  }

  get tail(): number | undefined {
    const {tailIndex} = this;
    if (tailIndex !== undefined) {
      return this.stack[tailIndex];
    }
    return undefined;
  }

  add(newBlock: number): number[] {
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

  removeTail(): number | undefined {
    const {tailIndex, tail} = this;
    if (tailIndex !== undefined) {
      this.stack[tailIndex] = -1;
    }

    return tail;
  }
}