import { extractRandomFromArray, pickRandomFromArray } from '@utils/array';
import {BlockStack} from './BlockStack';

const generateBlockStackShell = (stackCount: number, max: number, min: number) => {
  if (max > 8) {
    console.log('max should not exceed 6');
  }

  if (min < 2) {
    console.log('min should be larger than 1');
  }

  const result = [];
  for (let i = 0; i < stackCount; i += 1) {
    const numBetweenMinMax = min + Math.round(Math.random() * (max - min))
    result.push(Array(numBetweenMinMax).fill(-1));
  }
  
  return result;
}

const generateSeed = (blockStackMap: number[][], maxScore: number, colorCount: number) => {
  let colors: number[] = [];
  for (let i = 0; i < colorCount; i += 1) {
    colors.push(i);
  }

  const stackShell = blockStackMap;
  let pickedColorCopy = colors.slice(0);
  let stackShellIndexArray = stackShell.map((_, index) => index);
  for (let i = 0; i < colorCount; i += 1) {
    const {pickedEle: randomShellIndex, extractedArray: nextStackShellIndexArray} = extractRandomFromArray(stackShellIndexArray);
    const {pickedEle: randomColor, extractedArray: nextPickedColorCopy} = extractRandomFromArray(pickedColorCopy);
    stackShellIndexArray = nextStackShellIndexArray;
    pickedColorCopy = nextPickedColorCopy;
    stackShell[randomShellIndex].fill(randomColor);
  }

  for (let i = 0; i < maxScore - colorCount; i += 1) {
    const {pickedEle: randomShellIndex, extractedArray: nextStackShellIndexArray} = extractRandomFromArray(stackShellIndexArray);
    const randomColor = pickRandomFromArray(colors);
    stackShellIndexArray = nextStackShellIndexArray;
    stackShell[randomShellIndex].fill(randomColor);
  }

  const mappedToBlockStack = stackShell.map((stackShape) => new BlockStack(stackShape));

  return mappedToBlockStack
};

const moveBlockFromTo = (stackMap: BlockStack[], fromIndex: number, toIndex: number) => {
  const fromStack = stackMap[fromIndex];
  const toStack = stackMap[toIndex];

  if (!fromStack.isEmpty && !toStack.isFull) {
    const lastEleInFromStack = fromStack.remove() as number;
    toStack.add(lastEleInFromStack);
  }

  return stackMap;
}

// TO DO: 하나의 스택을 모두 비워서 골고루 뿌리는 식으로 스까야 한다.
const shuffleStacks = (stackMap: BlockStack[], shuffleCount: number) => {
  const spreadStack = (spreadTarget: BlockStack) => {
    while (!spreadTarget.isEmpty) {
      const randomStacksToFill = stackMap
        .filter((stack) => !stack.isFull && stack !== spreadTarget);
      const fillTarget: BlockStack = pickRandomFromArray(randomStacksToFill);
      if (!fillTarget) return;
      const lastEle = spreadTarget.remove() as number;
      fillTarget.add(lastEle);
    }
  }

  const fillStack = (fillTarget: BlockStack) => {
    while(!fillTarget.isFull) {
      const randomStacksToPick = stackMap
        .filter((stack) => !stack.isEmpty && stack !== fillTarget);
      const pickTarget: BlockStack = pickRandomFromArray(randomStacksToPick);
      if (!pickTarget) return;
      const lastEle = pickTarget.remove() as number;
      fillTarget.add(lastEle);
    }
  }

  const shuffle = () => {
    for (let i = 0; i < stackMap.length; i += 1) {
      const targetStack = stackMap[i];
      const countMap = targetStack.stack.reduce((acc: {[index: number]: number}, block: number) => {
        if (acc[block] === undefined) {
          acc[block] = 1;
        } else {
          acc[block] += 1;
        }
        return acc;
      }, {});
      const hasSameColor = Object.values(countMap).filter((num) => num > 1).length > 0;
      if (hasSameColor) {
        spreadStack(targetStack);
      } else {
        fillStack(targetStack);
      }
    }
  }

  for (let i = 0; i < shuffleCount; i += 1) {
    if (i % 2 === 0) {
      const stacksHasAnySpace = stackMap.filter((stack) => !stack.isFull);
      const randomStackFromAnySpaces = pickRandomFromArray(stacksHasAnySpace);
      fillStack(randomStackFromAnySpaces);
    } else {
      shuffle();
    }
  }

  return stackMap;
}

export const checkIfFinished = (stackMap: BlockStack[]) => {
  const successMap = stackMap.map((stack) => {
    const allBlocksHasSameColor = stack.stack.reduce((acc, block) => {
      if (acc === false) return acc;
      if (block !== stack.stack[0]) return false;
      return true;
    }, true); 
    return stack.isFull && allBlocksHasSameColor;
  })
  const failCount = successMap.filter((result) => result === false).length;
  return failCount === 0;
}

export type MapOption = {
  blockStackCount: number;
  stackLengthMax: number;
  stackLengthMin: number;
  maxScore: number;
  colorCount: number;
  shuffleCount?: number;
}

export const generateMap = (mapOption: MapOption) => {
  const {blockStackCount, stackLengthMax, stackLengthMin, maxScore, colorCount, shuffleCount} = mapOption;
  const blockStackShell = generateBlockStackShell(blockStackCount, stackLengthMax, stackLengthMin);

  if (blockStackCount - 1 < maxScore) {
    console.log('INVALID INPUT')
  }
  
  if (maxScore < colorCount) {
    console.log('colorCount should be smaller than maxScore')
  }

  const seed = generateSeed(blockStackShell, maxScore, colorCount);
  const answer = seed.map((blockStack) => {
    const space = Array(blockStack.limit - blockStack.stack.length).fill(-1);
    return blockStack.stack.slice(0).concat(space);
  });

  let shuffled = shuffleStacks(seed, shuffleCount || 100);
  let mistakenlyFinished = checkIfFinished(shuffled);
  while (mistakenlyFinished) {
    shuffled = shuffleStacks(seed, shuffleCount || 100);
    mistakenlyFinished = checkIfFinished(shuffled);
  }
  const question = shuffled.map((blockStack) => {
    const mappedStack = blockStack.stack;
    const space = Array(blockStack.limit - blockStack.stack.length).fill(-1);
    return mappedStack.concat(space);
  });

  const map = {question, answer};
  return map
}

export default generateMap;
