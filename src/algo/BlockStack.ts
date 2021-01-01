export class BlockStack {
  limit: number;
  stack: number[];
  constructor(rawStack: number[]) {
    const filteredStack = rawStack.filter((num) => num !== -1);
    this.limit = rawStack.length;
    this.stack = filteredStack;
  }

  get hasOneColor(): boolean {
    const {stack} = this;
    const bottomBlock = stack[0];
    if (!bottomBlock) return false;
    for (let i = 1; i < stack.length ; i += 1) {
      if (stack[i] !== bottomBlock) return false;
    }
    return true;
  }

  get finished(): boolean {
    return this.isFull && this.hasOneColor
  }

  get isEmpty(): boolean {
    if (!this.stack.length) {
      return true;
    } else {
      return false;
    }
  }
  
  get isFull(): boolean {
    if (this.limit <= this.stack.length) {
      return true;
    } else {
      return false;
    }
  }

  remove() {
    return this.stack.pop();
  }

  add(block: number) {
    if (this.stack.length < this.limit) {
      this.stack.push(block);
    }
    return this.stack;
  }
}

export default BlockStack