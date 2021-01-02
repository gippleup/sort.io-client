import { BlockTypes } from "@components/Block/Types";

type BlockStackOption = {
  limit: number;
}

type CreateStackOption = {
  stackLengthMax: number,
  stackLengthMin: number,
  color?: BlockTypes
}

export type StackStatus = "dock" | "undock" | "undocked" | "docked";

export default class BlockStackModel {
  history: BlockTypes[][] = [[]];
  stack: BlockTypes[] = [];
  limit: number = 3;
  status: StackStatus = "docked";
  constructor(option: BlockStackOption) {
    const {limit} = option;
    this.limit = limit;
  }

  get lastBlock() {
    return this.stack[this.stack.length - 1];
  }

  get filledLength() {
    return this.stack.filter((block) => block !== -1).length;
  }

  fill(block: BlockTypes) {
    this.stack = Array(this.limit).fill(block);
    this.history.push(this.stack);
    return this.stack;
  }
  
  push(block: BlockTypes): boolean {
    if (this.filledLength >= this.limit) return false;
    this.history.push(this.stack);
    const blankSpaceIndex = this.stack.reduce((acc, ele, i) => acc === -1 && ele === -1 ? i : acc, -1);
    const copy = this.stack.slice(0);
    copy[blankSpaceIndex] = block;
    this.stack = copy;
    return true;
  }

  pop(): BlockTypes | null {
    if (this.stack.length <= 0) return null;
    const lastBlockIndex = this.stack.reduce((acc, ele, i) => ele !== -1 ? i : acc, -1);
    const copy = this.stack.slice(0);
    const lastBlock = copy[lastBlockIndex];
    copy[lastBlockIndex] = -1;
    this.stack = copy;
    return lastBlock;
  }

  updateStatus(status: StackStatus) {
    this.status = status;
  }

  updateStack(data: BlockTypes[]) {
    this.stack = data;
  }

  get finished(): boolean {
    const isFull = this.stack.length === this.limit;
    const isAllSameColor = this.stack.reduce((acc, block) => block === this.stack[0] ? acc : false, true)
    return isFull && isAllSameColor;
  }

  static createStack(option: CreateStackOption) {
    const {stackLengthMax, stackLengthMin, color} = option;
    const numBetweenMinMax = Math.round(Math.random() * (stackLengthMax - stackLengthMin)) + stackLengthMin;
    const stackModel = new BlockStackModel({limit: numBetweenMinMax});
    if (color) stackModel.fill(color);
    return stackModel;
  }
}