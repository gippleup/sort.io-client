import React from 'react';
import {View, Text, Dimensions, ViewStyle} from 'react-native';
import model, {TBlockStack} from './BlockBoard/Model/model';
import BlockStack from './BlockStack';
import styled from 'styled-components';
import Constants from '../assets/Constants';

const Board: typeof View = styled(View)`
  background-color: royalblue;
`;

const Row: typeof View = styled(View)`
  justify-content: space-between;
  flex-direction: row;
  align-items: flex-end;
  padding: 15px;
  height: ${Constants.blockHeight.bottom +
  Constants.blockHeight.piece * 5 +
  Constants.blockHeight.top +
  Constants.blockPadding * 2}px;
`;

const Frame: React.FC<{pieceCount: number}> = styled(View)`
  width: ${Constants.blockWidth}px;
  height: ${(props) =>
    Constants.blockHeight.bottom +
    Constants.blockHeight.top +
    Constants.blockHeight.piece * props.pieceCount}px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const BaseStackContainer: typeof View = styled(View)``;

const BlockStackContainer: typeof View = styled(View)`
  width: 100%;
  position: absolute;
`;

const TouchAgentContainer: typeof View = styled(View)`
  position: absolute;
  width: 100%;
  opacity: 0;
`;

const TouchAgent: typeof View = styled(View)`
  background-color: black;
  width: ${Constants.blockWidth}px;
  height: 100%;
`;

type BlockBoardProps = {
  stackMap: number[][];
  style: ViewStyle;
};

const BlockBoard: React.FC<BlockBoardProps> = (props) => {
  const [state, dispatch] = React.useReducer(model.reducer, model.initialState);

  const column = Math.floor(
    props.style.width / (Constants.blockWidth + Constants.blockPadding),
  );

  const row = Math.ceil(state.blockStackCount / column);

  if (!props.stackMap) {
    return <></>;
  }

  if (!state.blockStackCount) {
    dispatch(model.actions.loadMap(props.stackMap));
  }

  const stacks = Object.values(state.blockStacks);

  const putStacksToRow = (
    stackArr: TBlockStack[],
    columnNum: number,
    rowNum: number,
  ) => {
    const result = [];
    for (let i = 0; i < stackArr.length; i += columnNum) {
      const groupedStack = stackArr.slice(i, i + columnNum);
      result.push(groupedStack);
    }
    return result;
  };

  const arrangedStack: TBlockStack[][] = putStacksToRow(stacks, column, row);

  const renderStacks = (type: 'base' | 'block' | 'touchAgent') => {
    return (
      <>
        {arrangedStack.map((stackArr, i) => (
          <Row key={'row' + type + i}>
            {stackArr.map((stack) => {
              if (!stack) {
                return <View />;
              }

              if (type === 'base') {
                return (
                  <Frame
                    key={type + 'frame' + stack.id}
                    pieceCount={stack.max}
                  />
                );
              }

              if (type === 'touchAgent') {
                return (
                  <TouchAgent
                    key={type + stack.id}
                    onTouchStart={() => {
                      const touchedStack = state.blockStacks[stack.id];
                      if (!state.isDockReady && !touchedStack.curStack.length) {
                        return;
                      }
                      dispatch(model.actions.toggleDock(stack.id));
                    }}
                  />
                );
              }

              const mappedStack = stack.curStack.map((id) => state.blocks[id]);
              return (
                <BlockStack
                  data={mappedStack}
                  max={stack.max}
                  key={type + stack.id}
                  completed={stack.completed}
                  isBase={type !== 'block'}
                  curState={stack.curState}
                  prevState={stack.prevState}
                />
              );
            })}
          </Row>
        ))}
      </>
    );
  };

  console.log(state.hasWon);

  return (
    <Board style={props.style}>
      <View>{renderStacks('base')}</View>
      <BlockStackContainer>{renderStacks('block')}</BlockStackContainer>
      <TouchAgentContainer>{renderStacks('touchAgent')}</TouchAgentContainer>
    </Board>
  );
};

export default BlockBoard;
