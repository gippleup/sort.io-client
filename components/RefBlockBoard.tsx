import React, {Component, RefObject, Fragment} from 'react';
import {
  Text,
  View,
  ViewStyle,
  LayoutRectangle,
  LayoutChangeEvent,
  Easing,
  Animated,
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

type pieceModel = {
  ref: RefObject<RefBox>;
  type: BlockTypes;
};

type stackModel = {
  capRef: RefObject<RefBox>;
  pieces: pieceModel[];
  bottomRef: RefObject<RefBox>;
  max: number;
};

type RefBlockBoardProps = {
  style?: ViewStyle;
  initialMap: BlockTypes[][];
  scale?: number;
  skin: skins;
  onComplete?: () => void;
  onChange?: (score: number) => void;
};

type RefBlockBoardState = {
  layout: null | LayoutRectangle;
};

export class RefBlockBoard extends Component<
  RefBlockBoardProps,
  RefBlockBoardState
> {
  constructor(props: RefBlockBoardProps) {
    super(props);
    this.state = {
      layout: null,
    };
    this.catchLayout = this.catchLayout.bind(this);

    this.getTopPiecePos = this.getTopPiecePos.bind(this);

    this.undock = this.undock.bind(this);

    this.alertUnableToDock = this.alertUnableToDock.bind(this);
    this.dock = this.dock.bind(this);
    this.dockToSelf = this.dockToSelf.bind(this);
    this.dockToOther = this.dockToOther.bind(this);

    this.checkIfStackCompleted = this.checkIfStackCompleted.bind(this);

    this.getCurScore = this.getCurScore.bind(this);
    this.getCompleteMap = this.getCompleteMap.bind(this);
  }

  stacks: stackModel[] = Array(this.props.initialMap.length);
  layoutRef = React.createRef<View>();
  readyToDock = false;
  dockOrigin: stackModel | null = null;

  scale = 1;
  maxRows = 3;
  maxColumns = 3;
  blockWidth = Constants.blockWidth;
  blockHeight = Constants.blockHeight.full;
  marginVertical = 15;
  marginHorizontal = 15;

  checkIfStackCompleted(stackIndex: number) {
    const targetStack = this.stacks[stackIndex];
    let stackCompleted = targetStack.pieces.length === targetStack.max;
    targetStack.pieces.forEach((piece) => {
      if (piece.type !== targetStack.pieces[0].type) {
        stackCompleted = false;
      }
    });
    return stackCompleted;
  }

  getCompleteMap() {
    const filledStacks = this.stacks.filter((stack) => stack.pieces.length);
    const completeMap = filledStacks.map((stack, i) =>
      this.checkIfStackCompleted(i),
    );
    return completeMap;
  }

  getCurScore() {
    return this.getCompleteMap().filter((bool) => bool).length;
  }

  getTopPiecePos(stackIndex: number) {
    const {
      maxColumns,
      stacks,
      scale,
      marginHorizontal,
      marginVertical,
      blockWidth,
      blockHeight,
    } = this;
    const targetStack = stacks[stackIndex];
    const stackRow = Math.floor(stackIndex / maxColumns);
    const stackColumn = stackIndex % maxColumns;
    const curStackLength = targetStack.pieces.length;

    const curPos = {
      x: marginHorizontal + (blockWidth + marginHorizontal * 2) * stackColumn,
      y:
        marginVertical +
        (blockHeight + marginVertical * 2) * stackRow +
        Constants.blockHeight.top * scale +
        Constants.blockHeight.piece * scale * 5 -
        Constants.blockHeight.piece * scale * curStackLength,
    };

    return curPos;
  }

  undock(stackIndex: number) {
    const topPiecePos = this.getTopPiecePos(stackIndex);
    const targetStack = this.stacks[stackIndex];
    const pieceOnTop = targetStack.pieces.pop();

    if (!pieceOnTop) {
      return;
    }

    targetStack.pieces.push(pieceOnTop);

    let originStackWasCompleted = this.checkIfStackCompleted(stackIndex);

    if (originStackWasCompleted && targetStack.capRef.current) {
      targetStack.capRef.current.setScale(0);
    }

    this.dockOrigin = targetStack;
    this.readyToDock = true;
    pieceOnTop.ref.current
      ?.animateY(topPiecePos.y - 20, 300, Easing.in(Easing.elastic(3)))
      .start();
  }

  dockToSelf(stackIndex: number) {
    const {stacks, getTopPiecePos} = this;
    const targetStack = stacks[stackIndex];
    const topPiecePos = getTopPiecePos(stackIndex);
    const pieceOnTop = targetStack.pieces.pop();

    if (!pieceOnTop) {
      return;
    }
    targetStack.pieces.push(pieceOnTop);

    let originStackWasCompleted = this.checkIfStackCompleted(stackIndex);

    if (originStackWasCompleted && targetStack.capRef.current) {
      targetStack.capRef.current
        ?.animateScale(1, 300, Easing.inOut(Easing.ease))
        .start();
    }
    this.readyToDock = false;
    this.dockOrigin = null;
    pieceOnTop.ref.current
      ?.animateY(topPiecePos.y, 300, Easing.in(Easing.bounce))
      .start();
  }

  alertUnableToDock(stackIndex: number) {
    const {stacks, getTopPiecePos} = this;
    const topPiecePos = getTopPiecePos(stackIndex);
    const targetStack = stacks[stackIndex];
    const pieceOnTop = targetStack.pieces.pop();
    if (!pieceOnTop) {
      return;
    }
    targetStack.pieces.push(pieceOnTop);
    pieceOnTop?.ref.current?.setY(topPiecePos.y - 20);
    pieceOnTop?.ref.current
      ?.animateY(topPiecePos.y, 300, Easing.in(Easing.bounce))
      .start();
    return;
  }

  dockToOther(stackIndex: number) {
    let mainAnimation = [];
    const {stacks, getTopPiecePos, dockOrigin, props} = this;
    const targetStack = stacks[stackIndex];
    const topPiecePos = getTopPiecePos(stackIndex);
    const pieceOnTopOfOrigin = dockOrigin?.pieces.pop();

    if (!pieceOnTopOfOrigin || !pieceOnTopOfOrigin.ref.current) {
      return;
    }

    this.readyToDock = false;
    targetStack.pieces.push(pieceOnTopOfOrigin);
    let targetStackCompleted = this.checkIfStackCompleted(stackIndex);

    const readyForAppearAnim = () => {
      pieceOnTopOfOrigin?.ref.current?.setXY(
        topPiecePos.x,
        topPiecePos.y - Constants.blockHeight.piece - 20,
      );
      pieceOnTopOfOrigin.ref.current?.setScale(0);
    };

    readyForAppearAnim();
    const appearAnim = Animated.parallel([
      pieceOnTopOfOrigin.ref.current?.animateScale(
        1,
        100,
        Easing.inOut(Easing.ease),
      ),
      pieceOnTopOfOrigin?.ref.current?.animateXY(
        topPiecePos.x,
        topPiecePos.y - Constants.blockHeight.piece,
        300,
        Easing.in(Easing.bounce),
      ),
    ]);

    mainAnimation.push(appearAnim);

    if (targetStackCompleted && targetStack.capRef.current) {
      const readyForCapAnim = () => {
        targetStack.capRef.current?.setOpacity(1);
        targetStack.capRef.current?.setY(
          topPiecePos.y -
            Constants.blockHeight.piece -
            Constants.blockHeight.top - 20,
        );
      };

      readyForCapAnim();
      const capDockAnim = Animated.sequence([
        targetStack.capRef.current?.animateScale(
          1,
          100,
          Easing.inOut(Easing.ease),
        ),
        targetStack.capRef.current?.animateY(
          topPiecePos.y -
            Constants.blockHeight.piece -
            Constants.blockHeight.top,
          300,
          Easing.in(Easing.bounce),
        ),
      ]);

      mainAnimation.push(capDockAnim);
    }

    const completeMap = this.getCompleteMap();
    const score = completeMap.filter((bool) => bool).length;
    const completedAllStack = completeMap.indexOf(false) === -1;

    if (completedAllStack && props.onComplete) {
      props.onComplete();
    }

    if (props.onChange) {
      props.onChange(score);
    }

    Animated.parallel(mainAnimation).start();
  }

  dock(stackIndex: number) {
    const {
      stacks,
      dockToSelf,
      dockToOther,
      alertUnableToDock,
      dockOrigin,
    } = this;
    const targetStack = stacks[stackIndex];
    if (targetStack === dockOrigin) {
      dockToSelf(stackIndex);
    } else if (targetStack.pieces.length === targetStack.max) {
      alertUnableToDock(stackIndex);
    } else {
      dockToOther(stackIndex);
    }
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
      state.layout.width / (blockWidth + Constants.blockPadding * scale * 2),
    );
    const maxRows = Math.floor(
      state.layout.height / (blockHeight + Constants.blockPadding * scale * 2),
    );

    const leftWidth = state.layout.width - maxColumns * blockWidth;
    const leftHeight = state.layout.height - maxRows * blockHeight;

    const marginHorizontal = (leftWidth / (maxColumns * 2)) * scale;
    const marginVertical = (leftHeight / (maxRows * 2)) * scale;

    this.scale = scale;
    this.blockWidth = blockWidth;
    this.blockHeight = blockHeight;
    this.maxColumns = maxColumns;
    this.maxRows = maxRows;
    this.marginHorizontal = marginHorizontal;
    this.marginVertical = marginVertical;

    // if (maxRows * maxColumns < props.initialMap.length) {
    //   return (
    //     <View>
    //       <Text>공간이 부족합니다.</Text>
    //     </View>
    //   );
    // }

    const layout = Array(maxRows).fill(Array(maxColumns).fill(1));

    return (
      <View style={this.props.style}>
        <LayoutContainer>
          {layout.map((row, i) => (
            <Row key={'frameRow' + i} style={{marginVertical}}>
              {row.map((cell, j) => {
                const stackIndex = layout[0].length * i + j;
                if (props.initialMap[stackIndex] === undefined) {
                  return (
                    <Cell key={'cell' + i + j} style={{marginHorizontal}} />
                  );
                }
                return (
                  <Cell key={'cell' + i + j} style={{marginHorizontal}}>
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
        <LayoutContainer ref={this.layoutRef}>
          {layout.map((row, i) =>
            row.map((cell, j) => {
              const stackIndex = layout[0].length * i + j;
              const curStack = props.initialMap[stackIndex];
              if (curStack === undefined) {
                return <Fragment key={'fragment' + i + j} />;
              }

              const filteredStack = curStack.filter((type) =>
                type === -1 ? false : true,
              );

              const checker: {[index: number]: boolean} = {};
              filteredStack.forEach((type) => (checker[type] = true));
              const completed =
                Object.keys(checker).length === 1 &&
                filteredStack.length === curStack.length;

              const capRef = React.createRef<RefBox>();
              const pieces = filteredStack.map((type) => ({
                ref: React.createRef<RefBox>(),
                type,
              }));
              const bottomRef = React.createRef<RefBox>();
              const stackModel = {
                capRef,
                pieces,
                bottomRef,
                max: curStack.length,
              };
              this.stacks[stackIndex] = stackModel;
              return (
                <Fragment key={'fragment' + i + j}>
                  <AbsoluteRefBox
                    ref={capRef}
                    key={'cap' + i + j}
                    // eslint-disable-next-line react-native/no-inline-styles
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
                      opacity: completed ? 1 : 0,
                    }}>
                    <Block
                      base={TopBase}
                      shape={skinMap[props.skin].top}
                      type={filteredStack[0] || 9}
                      scale={scale}
                      visible={true}
                    />
                  </AbsoluteRefBox>
                  {/* This is Block Piece */}
                  {filteredStack.map((type, k) => {
                    return (
                      <AbsoluteRefBox
                        key={'piece' + i + j + k}
                        ref={pieces[k].ref}
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
                    ref={bottomRef}
                    key={'bottom' + i + j}
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
                </Fragment>
              );
            }),
          )}
        </LayoutContainer>
        <LayoutContainer>
          {layout.map((row, i) => (
            <Row key={'agentRow' + i} style={{marginVertical}}>
              {row.map((cell, j) => {
                const stackIndex = layout[0].length * i + j;
                if (props.initialMap[stackIndex] === undefined) {
                  return (
                    <Cell
                      key={'agentRowCell' + i + j}
                      style={{marginHorizontal}}
                    />
                  );
                }
                return (
                  <Cell key={'agentRowCell' + i + j} style={{marginHorizontal}}>
                    <TouchAgent
                      onTouchStart={() => {
                        if (!this.readyToDock) {
                          this.undock(stackIndex);
                        } else {
                          this.dock(stackIndex);
                        }
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
