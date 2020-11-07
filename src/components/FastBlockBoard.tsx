import React, { Fragment } from 'react'
import { View, Text, ViewStyle, LayoutRectangle, Dimensions, LayoutChangeEvent } from 'react-native'
import Constants from '../assets/Constants'
import { SupportedSkin } from './Block/skinMap'
import { FastBlockBoardActions } from './FastBlockBoard/action'
import { FastBoardModel, FastBoardStatus, FastStackStatus } from './FastBlockBoard/FastBoardModel'
import { FastBoardReducer } from './FastBlockBoard/reducer'
import { getStackLayout } from './FastBlockBoard/utils'
import FastBlockStack from './FastBlockStack'
import { FlexHorizontal } from './Generic/StyledComponents'
import { Easings } from './NativeRefBox/easings'

type FastBlockBoardProps = {
  initialMap: number[][];
  noGradient?: boolean;
  noAnimation?: boolean;
  skin?: SupportedSkin;
  width?: number;
  height?: number;
}

const FastBlockBoard = (props: FastBlockBoardProps) => {
  const {
    noAnimation,
    initialMap,
    noGradient,
    skin,
    height = 200,
    width = 300,
  } = props;

  const initialBoardStatus: FastBoardStatus = {
    stacks: initialMap,
    activeStack: null,
    holdingBlock: null,
    finished: false,
    score: 0,
  }

  const [boardStatus, dispatch] = React.useReducer(
    FastBoardReducer,
    new FastBoardModel(initialBoardStatus).boardStatus
  );

  const {stacks, activeStack} = boardStatus;
  const firedEvent = React.useRef({
    layout: false,
    complete: false,
  })

  const onTouchStack = (stackIndex: number) => {
    dispatch(FastBlockBoardActions.touchBlock(stackIndex));
  }

  const {
    scale,
    stackMarginHorizontal,
    stackMarginVertical,
    boardPaddingHorizontal,
    boardPaddingVertical,
    column,
    row,
  } = getStackLayout({width, height}, stacks.length);

  const stackLayoutArr: number[][] = Array(row).fill(Array(column).fill(1));
  return (
    <View style={{
      paddingHorizontal: boardPaddingHorizontal,
      paddingVertical: boardPaddingVertical,
      justifyContent: 'space-around',
      alignItems: 'center',
      width,
      height,
    }}>
      {stackLayoutArr.map((row, rowIndex) => {
        return (
          <FlexHorizontal key={`row${rowIndex}`} style={{alignItems: "flex-end"}}>
            {row.map((_, columnIndex) => {
              const stackIndex = rowIndex * row.length + columnIndex;
              const stack = stacks[stackIndex];
              if (!stack) return <Fragment key={`fragment${stackIndex}`}></Fragment>;
              const blankSpace = stack.filter((blockType) => blockType === -1);
              const allHasSameColor = stack.filter((blockType) => blockType !== stack[0]).length === 0;
              const completed = blankSpace.length === 0 && allHasSameColor;
              const stackStatus: FastStackStatus = activeStack === null
                ? "neutral"
                : activeStack.index === stackIndex 
                  ? activeStack.status
                  : "neutral";
              const onTouchEnd = () => onTouchStack(stackIndex);
              return (
                <FastBlockStack
                  stack={stack}
                  completed={completed}
                  scale={scale}
                  skin={skin}
                  noGradient={noGradient}
                  noAnimation={noAnimation}
                  key={`stack${stackIndex}`}
                  onTouchEnd={onTouchEnd}
                  status={stackStatus}
                  style={{
                    marginHorizontal: stackMarginHorizontal,
                    marginVertical: stackMarginVertical,
                    height: Constants.blockHeight.count(stack.length) * scale,
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    backgroundColor: "rgba(0,0,0,0.2)"
                  }}
                />
              )
            })}
          </FlexHorizontal>
        )
      })}
    </View>
  )
}

export default FastBlockBoard
