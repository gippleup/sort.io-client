import React, {Component, RefObject} from 'react';
import {
  Text,
  View,
  ViewStyle,
  LayoutRectangle,
  LayoutChangeEvent,
} from 'react-native';
import styled from 'styled-components';
import Constants from '../assets/Constants';
import BlockFrame from './BlockStack/BlockFrame';
import Block from './Block';
import BottomBase from './Block/BottomBase';
import skinMap, {skins} from './BlockStack/skinMap';
import {BlockTypes} from './Block/Types';
import RefBox from './RefBox';
import PieceBase from './Block/PieceBase';
import TouchAgent from './TouchAgent';
import TopBase from './Block/TopBase';

const LayoutContainer: typeof View = styled(View)`
  justify-content: center;
  align-items: center;
  position: absolute;
`;

const AbsoluteRefBox: typeof RefBox = styled(RefBox)`
  position: absolute;
`;

const Row: typeof View = styled(View)`
  flex-direction: row;
`;

const Cell: typeof View = styled(View)`
  width: ${Constants.blockWidth}px;
  height: ${Constants.blockHeight.full}px;
  justify-content: flex-end;
`;

type RefBlockBoardProps = {
  style?: ViewStyle;
  initialMap: BlockTypes[][];
  scale?: number;
  skin: skins;
};

type RefBlockBoardState = {
  layout: null | LayoutRectangle;
};

export class RefBlockBoard extends Component<
  RefBlockBoardProps,
  RefBlockBoardState
> {
  stacks: {
    [index: number]: {
      capRef: RefObject<Block>;
      pieceRefs: RefObject<RefBox>[];
    };
  } = {};
  constructor(props: RefBlockBoardProps) {
    super(props);
    this.state = {
      layout: null,
    };
    this.catchLayout = this.catchLayout.bind(this);
  }
  catchLayout(e: LayoutChangeEvent) {
    this.setState({
      ...this.state,
      layout: e.nativeEvent.layout,
    });
  }
  render() {
    const {props, catchLayout, state} = this;
    if (!state.layout) {
      return <View onLayout={catchLayout} style={this.props.style} />;
    }

    const scale = props.scale || 1;
    const blockWidth = Constants.blockWidth * scale;
    const blockHeight = Constants.blockHeight.full * scale;

    const maxColumns = Math.floor(
      state.layout.width / (blockWidth + Constants.blockPadding * 2),
    );
    const maxRows = Math.floor(
      state.layout.height / (blockHeight + Constants.blockPadding * 2),
    );

    const leftWidth = state.layout.width - maxColumns * blockWidth;
    const leftHeight = state.layout.height - maxRows * blockHeight;

    const marginHorizontal = leftWidth / (maxColumns * 2);
    const marginVertical = leftHeight / (maxRows * 2);

    if (maxRows * maxColumns < props.initialMap.length) {
      return (
        <View>
          <Text>공간이 부족합니다.</Text>
        </View>
      );
    }

    const layout = Array(maxRows).fill(Array(maxColumns).fill(1));

    return (
      <View style={this.props.style}>
        <LayoutContainer>
          {layout.map((row, i) => (
            <Row style={{marginVertical}}>
              {row.map((cell, j) => {
                const stackIndex = layout[0].length * i + j;
                if (props.initialMap[stackIndex] === undefined) {
                  return <Cell style={{marginHorizontal}} />;
                }
                return (
                  <Cell style={{marginHorizontal}}>
                    <BlockFrame
                      pieceCount={props.initialMap[stackIndex].length}
                      scale={scale}
                    />
                  </Cell>
                );
              })}
            </Row>
          ))}
        </LayoutContainer>
        <LayoutContainer>
          {layout.map((row, i) =>
            row.map((cell, j) => {
              const stackIndex = layout[0].length * i + j;
              const curStack = props.initialMap[stackIndex];
              if (curStack === undefined) {
                return <></>;
              }

              const filteredStack = curStack.filter((type) =>
                type === -1 ? false : true,
              );

              const checker: {[index: number]: boolean} = {};
              filteredStack.forEach((type) => (checker[type] = true));
              const completed =
                Object.keys(checker).length === 1 &&
                filteredStack.length === curStack.length;

              const capRef = React.createRef<Block>();
              const pieceRefs = filteredStack.map(() =>
                React.createRef<RefBox>(),
              );
              const stackModel = {
                capRef,
                pieceRefs,
              };
              this.stacks[stackIndex] = stackModel;
              return (
                <>
                  <AbsoluteRefBox
                    style={{
                      left:
                        marginHorizontal +
                        j * (blockWidth + marginHorizontal * 2),
                      top:
                        marginVertical +
                        i * (blockHeight + marginVertical * 2) +
                        blockHeight -
                        Constants.blockHeight.bottom * scale -
                        Constants.blockHeight.piece * curStack.length -
                        Constants.blockHeight.top,
                    }}>
                    <Block
                      ref={capRef}
                      base={TopBase}
                      shape={skinMap[props.skin].top}
                      type={filteredStack[0] || 9}
                      scale={scale}
                      visible={completed ? true : false}
                    />
                  </AbsoluteRefBox>
                  {/* This is Block Piece */}
                  {filteredStack.map((type, k) => {
                    return (
                      <AbsoluteRefBox
                        ref={pieceRefs[k]}
                        style={{
                          left:
                            marginHorizontal +
                            j * (blockWidth + marginHorizontal * 2),
                          top:
                            marginVertical +
                            i * (blockHeight + marginVertical * 2) +
                            blockHeight -
                            Constants.blockHeight.bottom * scale -
                            Constants.blockHeight.piece * (k + 1),
                        }}>
                        <Block
                          base={PieceBase}
                          shape={skinMap[props.skin].piece}
                          type={type}
                          scale={scale}
                        />
                      </AbsoluteRefBox>
                    );
                  })}
                  {/* This is Block Bottom */}
                  <AbsoluteRefBox
                    style={{
                      left:
                        marginHorizontal +
                        j * (blockWidth + marginHorizontal * 2),
                      top:
                        marginVertical +
                        i * (blockHeight + marginVertical * 2) +
                        blockHeight -
                        Constants.blockHeight.bottom * scale,
                    }}>
                    <Block
                      visible={true}
                      base={BottomBase}
                      shape={skinMap[props.skin].bottom}
                      type={filteredStack[0] || 9}
                      scale={scale}
                    />
                  </AbsoluteRefBox>
                </>
              );
            }),
          )}
        </LayoutContainer>
        <LayoutContainer>
          {layout.map((row, i) => (
            <Row style={{marginVertical}}>
              {row.map((cell, j) => {
                const stackIndex = layout[0].length * i + j;
                if (props.initialMap[stackIndex] === undefined) {
                  return <Cell style={{marginHorizontal}} />;
                }
                return (
                  <Cell style={{marginHorizontal}}>
                    <TouchAgent
                      onTouchStart={() => {
                        this.stacks[stackIndex].pieceRefs[0].current
                          ?.animateXY(100, 100)
                          .start();
                      }}>
                      <BlockFrame pieceCount={5} scale={scale} />
                    </TouchAgent>
                  </Cell>
                );
              })}
            </Row>
          ))}
        </LayoutContainer>
      </View>
    );
  }
}

export default RefBlockBoard;
