import { BlockTypes } from "@components/Block/Types";
import { extractRandomFromArray, pickRandomFromArray } from "@utils/array";
import BlockStackModel, { StackStatus } from "./BlockStackModel";

export type BlockBoardStackData = {stack: BlockTypes[], status: StackStatus};

export type BlockBoardOption = {
  blockStackCount: number;
  stackLengthMax: number;
  stackLengthMin: number;
  maxScore: number;
  colorCount: number;
}

export default class BlockBoardModel {
  stacks: BlockStackModel[] = [];
  undockedStackIndex: undefined | number = undefined;
  constructor(initializer: BlockBoardOption | BlockBoardStackData[] | BlockBoardModel) {
    if ("blockStackCount" in initializer
    && "stackLengthMax" in initializer
    && "stackLengthMin" in initializer
    && "maxScore" in initializer
    && "colorCount" in initializer) {
      const {blockStackCount, stackLengthMax, stackLengthMin, maxScore, colorCount} = initializer;
      let generatedStackCount = 0;
      let colors = Array(colorCount).fill(0).map((_, i) => i);
      let requiredColors = colors.slice(0);
      this.stacks = Array(blockStackCount).fill(1).map(() => {
        const stack = BlockStackModel.createStack({stackLengthMax, stackLengthMin});
        const {pickedEle: pickedColor, extractedArray} = extractRandomFromArray(requiredColors);
        requiredColors = extractedArray;
        stack.fill(generatedStackCount < maxScore ? pickedColor | pickRandomFromArray(colors) : -1);
        generatedStackCount += 1;
        return stack;
      });
    } else if (Array.isArray(initializer)) {
      this.stacks = initializer.map((stackData) => {
        const {stack, status} = stackData;
        const stackModel = new BlockStackModel({limit: stack.length});
        stackModel.updateStack(stack);
        stackModel.updateStatus(status);
        return stackModel;
      })
    } else {
      this.stacks = initializer.stacks;
      this.undockedStackIndex = initializer.undockedStackIndex;
    }

    this.getStack = this.getStack.bind(this);
  }

  get stackDataForProps() {
    return this.stacks;
  }

  undock(stackIndex: number) {
    const {getStack} = this;
    const stack = getStack(stackIndex);
    if (!stack) return;
    this.undockedStackIndex = stackIndex;
    stack.updateStatus("undock");
  }

  dock(stackIndex: number) {
    const {getStack, undockedStackIndex} = this;
    const stack = getStack(stackIndex);
    if (!stack || undockedStackIndex === undefined) return;
    const undockedStack = getStack(undockedStackIndex);
    const undockedBlock = undockedStack?.pop();
    if (undockedBlock === undefined
      || undockedBlock === null
      || undockedStack === null) return;
      const pushResult = stack.push(undockedBlock);
    if (pushResult === true) {
      undockedStack.updateStatus("docked");
      stack.updateStatus("dock");
      this.undockedStackIndex = undefined;
    } else {
      undockedStack.push(undockedBlock);
      undockedStack.updateStatus("undocked");
      stack.updateStatus("docked");
    }
  }

  getStack(stackIndex: number) {
    const stack = this.stacks[stackIndex];
    if (!stack) return null;
    return stack;
  }
}