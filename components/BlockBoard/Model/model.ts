export enum ActionTypes {
  MOVE_BLOCK = 'MOVE_BLOCK',
  LOAD_MAP = 'LOAD_MAP',
  TOGGLE_DOCK = 'TOGGLE_DOCK',
}

export type TBlock = {
  id: number;
  type: number;
};

export type TBlockStack = {
  id: number;
  max: number;
  curStack: number[];
  completed: boolean;
  curState: 'neutral' | 'docked' | 'undocked';
  prevState: 'neutral' | 'docked' | 'undocked';
};

export type BlockBoardReducerState = {
  blocks: {
    [id: number]: TBlock;
  };
  blockCount: number;
  blockStacks: {
    [id: number]: TBlockStack;
  };
  blockStackCount: number;
  selectedStack: null | number;
  isDockReady: boolean;
  hasWon: boolean;
};

export type BlockBoardReducerAction = {
  type: string;
  payload?: any;
};

const initialState: BlockBoardReducerState = {
  blocks: {},
  blockCount: 0,
  blockStacks: {},
  blockStackCount: 0,
  selectedStack: null,
  isDockReady: false,
  hasWon: false,
};

const reducerMethods = (
  state: BlockBoardReducerState,
  newState: BlockBoardReducerState,
) => {
  const methods = {
    loadMap: (stackMap: number[][]) => {
      stackMap.forEach((stackData: number[]) => {
        const newStack = methods.createStack(stackData.length);
        stackData.forEach((blockType: number) => {
          if (blockType === -1) {
            return;
          }
          const newBlock = methods.createBlock(blockType);
          newStack.curStack.push(newBlock.id);
        });
        newStack.completed = methods.checkIfCompleted(newStack.id);
      });
    },
    createStack: (max: number) => {
      const newStack: TBlockStack = {
        id: newState.blockStackCount,
        max,
        curStack: [],
        completed: false,
        curState: 'neutral',
        prevState: 'neutral',
      };
      newState.blockStacks[newState.blockStackCount] = newStack;
      newState.blockStackCount += 1;
      return newStack;
    },
    createBlock: (type: number) => {
      const newBlock: TBlock = {
        id: newState.blockCount,
        type,
      };
      newState.blocks[newState.blockCount] = newBlock;
      newState.blockCount += 1;
      return newBlock;
    },
    moveBlock: (from: number, to: number) => {
      const originStack: TBlockStack = newState.blockStacks[from];
      const targetStack: TBlockStack = newState.blockStacks[to];

      if (targetStack.curStack.length >= targetStack.max) {
        return console.log('BlockStack Fully Occupied');
      }

      const lastBlockInOriginStack = originStack.curStack.pop();
      if (lastBlockInOriginStack === undefined) {
        return console.log('No Blocks to Move');
      }

      targetStack.curStack.push(lastBlockInOriginStack);
      originStack.completed = false;
      targetStack.completed = methods.checkIfCompleted(targetStack.id);
      methods.checkIfWon();
    },
    checkIfCompleted: (stackId: number) => {
      const targetStack: TBlockStack = newState.blockStacks[stackId];

      const mappedStack = targetStack.curStack.map(
        (blockId) => newState.blocks[blockId],
      );

      const checker: {[index: string]: boolean} = {};
      mappedStack.forEach((block) => (checker[block.type] = true));
      let isAllSameType = Object.values(checker).length === 1;
      let isFull = targetStack.max === targetStack.curStack.length;
      return isAllSameType && isFull;
    },
    toggleDock: (stackId: number) => {
      const targetStack: TBlockStack = newState.blockStacks[stackId];
      const prevStack: TBlockStack | null = state.selectedStack !== null
          ? newState.blockStacks[state.selectedStack]
          : null;
      newState.isDockReady = !state.isDockReady;

      if (!state.isDockReady) {
        methods.nuetralizeState();
        newState.selectedStack = stackId;
        targetStack.prevState = targetStack.curState;
        targetStack.curState = 'undocked';
      } else if (prevStack) {
        prevStack.prevState = prevStack.curState;
        prevStack.curState = 'docked';
        targetStack.prevState = targetStack.curState;
        targetStack.curState = 'docked';
        methods.moveBlock(prevStack.id, stackId);
      }
    },
    nuetralizeState: () => {
      Object.values(newState.blockStacks).forEach((stack) => {
        if (stack.curState === 'docked') {
          stack.curState = 'neutral';
        }
      });
    },
    checkIfWon: () => {
      let allSet = true;
      methods.forEachStack(state, (stack) => {
        if (stack.curStack.length && !stack.completed) {
          allSet = false;
        }
      });
      newState.hasWon = allSet;
      return allSet;
    },
    forEachStack: (
      targetState: BlockBoardReducerState,
      callback: (stack: TBlockStack) => void,
    ) => {
      Object.values(targetState.blockStacks)
        .map((stackData) => targetState.blockStacks[stackData.id])
        .forEach((stack) => callback(stack));
    },
  };

  return methods;
};

const reducer = (
  state: BlockBoardReducerState,
  action: BlockBoardReducerAction,
) => {
  const newState = {...state};
  const methods = reducerMethods(state, newState);

  if (action.type === ActionTypes.LOAD_MAP) {
    const stackMap = action.payload;
    methods.loadMap(stackMap);
  }

  if (action.type === ActionTypes.MOVE_BLOCK) {
    const {from, to} = action.payload;
    methods.moveBlock(from, to);
  }

  if (action.type === ActionTypes.TOGGLE_DOCK) {
    const stackId = action.payload;
    methods.toggleDock(stackId);
  }

  return newState;
};

type BlockStackMap = number[][];

const loadMap = (blockStackMap: BlockStackMap) => ({
  type: ActionTypes.LOAD_MAP,
  payload: blockStackMap,
});

const moveBlock = (from: number, to: number) => ({
  type: ActionTypes.MOVE_BLOCK,
  payload: {from, to},
});

const toggleDock = (stackId: number) => ({
  type: ActionTypes.TOGGLE_DOCK,
  payload: stackId,
});

export default {
  initialState,
  reducer,
  actions: {
    loadMap,
    moveBlock,
    toggleDock,
  },
};
