import React from 'react';
import {View, ViewStyle} from 'react-native';
import model, {TBlockStack, BlockBoardReducerAction, BlockBoardReducerState} from './BlockBoard/Model/model';
import BlockStack from './BlockStack';
import styled from 'styled-components';
import Constants from '../assets/Constants';
import {skins} from './Block/skinMap';

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

type BlockBoardProps = {
  stackMap: number[][];
  style: ViewStyle;
  skin: skins;
  onScoreChange?: (curScore: number) => void;
};

class BlockBoard extends React.Component<BlockBoardProps, {}> {
  constructor(props: BlockBoardProps) {
    super(props);
    this.dispatch = this.dispatch.bind(this);
    this.putStacksToRow = this.putStacksToRow.bind(this);
  }

  state: BlockBoardReducerState = JSON.parse(
    JSON.stringify(model.initialState),
  );

  dispatch = (action: BlockBoardReducerAction) => {
    this.setState(model.reducer(this.state, action));
  };

  componentDidMount() {
    const {state, dispatch, props} = this;
    if (!state.blockStackCount) {
      dispatch(model.actions.loadMap(props.stackMap));
    }
  }

  componentDidUpdate() {
    const {state, props} = this;
    const stacks = Object.values(state.blockStacks);
    const curScore = stacks.reduce(
      (acc, ele) => (ele.completed ? acc + 1 : acc),
      0,
    );
    if (props.onScoreChange) {
      props.onScoreChange(curScore);
    }
  }

  putStacksToRow(stackArr: TBlockStack[], columnNum: number, rowNum: number) {
    const result = [];
    for (let i = 0; i < stackArr.length; i += columnNum) {
      const groupedStack = stackArr.slice(i, i + columnNum);
      result.push(groupedStack);
    }
    return result;
  }

  shouldComponentUpdate(
    nextProps: BlockBoardProps,
    nextState: BlockBoardReducerState,
  ) {
    const {state} = this;
    if (state !== nextState) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const {props, state, putStacksToRow, dispatch} = this;
    const column = Math.floor(
      Number(props.style.width) / (Constants.blockWidth + Constants.blockPadding),
    );

    const row = Math.ceil(state.blockStackCount / column);

    const stacks = Object.values(state.blockStacks);

    const arrangedStack: TBlockStack[][] = putStacksToRow(stacks, column, row);

    if (!props.stackMap) {
      return <></>;
    }

    return (
      <Board style={props.style}>
        {arrangedStack.map((stackArr, i) => (
          <Row key={'row' + i}>
            {stackArr.map((stack) => {
              if (!stack) {
                return <View />;
              }

              const mappedStack = stack.curStack.map((id) => state.blocks[id]);
              return (
                <BlockStack
                  scale={1}
                  skin={props.skin}
                  data={mappedStack}
                  max={stack.max}
                  key={stack.id}
                  completed={stack.completed}
                  curState={stack.curState}
                  prevState={stack.prevState}
                  onTouchStart={() =>
                    dispatch(model.actions.toggleDock(stack.id))
                  }
                />
              );
            })}
          </Row>
        ))}
      </Board>
    );
  }
}

export default BlockBoard;
