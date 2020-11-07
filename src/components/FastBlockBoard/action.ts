export enum FastBoardActionTypes {
  TOUCH_BLOCK,
}

export const touchBlock = (stackIndex: number) => ({
  type: FastBoardActionTypes.TOUCH_BLOCK,
  payload: stackIndex,
})

export type FastBoardActions = 
  ReturnType<typeof touchBlock>;

export const FastBlockBoardActions = {
  touchBlock,
}