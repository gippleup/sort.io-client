import React, {Component, RefObject, Fragment} from 'react';
import {
  View,
  ViewStyle,
  LayoutRectangle,
  LayoutChangeEvent,
} from 'react-native';
import styled from 'styled-components';
import Constants from '../assets/Constants';
import BlockFrame from './BlockStack/BlockFrame';
import Block from './Block';
import {SupportedSkin} from './Block/skinMap';
import {BlockTypes} from './Block/Types';
import NativeRefBox, { RefAnimation } from './NativeRefBox';
import TouchAgent from './TouchAgent';
import BlockBase from './Block/BlockBase';
import { Easings } from './NativeRefBox/easings';
import chroma from 'chroma-js';
import { NotoSans } from './Generic/StyledComponents';
import DynamicText from './DynamicText';
import { getStackLayout } from '../api/layout';
import { checkNotifications } from 'react-native-permissions';

const LayoutContainer: typeof View = styled(View)`
  position: absolute;
`;

const AbsoluteRefBox: typeof NativeRefBox = styled(NativeRefBox)`
  position: absolute;
`;

const Row: typeof View = styled(View)`
  flex-direction: row;
`;

const Cell: typeof View | React.ComponentClass<{scale?: number}, any> = styled(View)<{scale?: number}>`
  width: ${(props) => props.scale ? Constants.blockWidth * props.scale : Constants.blockWidth}px;
  height: ${(props) => props.scale ? Constants.blockHeight.full * props.scale : Constants.blockHeight.full}px;
  justify-content: flex-end;
`;

type PieceModel = {
  ref: RefObject<NativeRefBox>;
  type: BlockTypes;
};

type StackModel = {
  capRef: RefObject<NativeRefBox>;
  capBlockRef: RefObject<Block>;
  pieces: PieceModel[];
  bottomRef: RefObject<Block>;
  max: number;
  sizeIndicator?: RefObject<DynamicText>;
};

type RefBlockBoardProps = {
  initialMap: BlockTypes[][];
  skin: SupportedSkin;
  onDock?: (stackIndex: number) => void;
  onUndock?: (stackIndex: number) => void;
  onComplete?: () => void;
  onCompleteStack?: (stackIndex: number) => any;
  onSelfCompleteStack?: (stackIndex: number) => any;
  onCancelCompleteStack?: (stackIndex: number) => any;
  onAlertUnableToDock?: (stackIndex: number) => any;
  onLeftOver?: (leftoverIndex: number) => any;
  onScoreChange?: (score: number) => void;
  onLayout?: () => void;
  fps?: number;
  noAnimation?: boolean;
  dockEasing?: Easings;
  dockEasingDuration?: number;
  noGradient?: boolean;
  width?: number;
  height?: number;
  maxScore?: number;
  showSize?: boolean;
};

const defaultDockEasing: Easings = "easeInOutSine";
const defaultDockEasingDuration = 100;

export class RefBlockBoard extends Component<RefBlockBoardProps, {shouldReset: boolean}> {
  renderedBlockCount = 0;
  requiredBlockCount: number;
  effectFrames: RefObject<BlockFrame>[];
  stacks: StackModel[];
  layoutRef = React.createRef<View>();
  readyToDock = false;
  dockOrigin: StackModel | null = null;
  isAnimating = false;
  dockCount = 0;
  forceFinishCallbacks: {[index: string]: {
    execute: Function;
    delete: Function;
    executeNDelete: Function;
  }} = {};

  scale = 1;
  row = 3;
  column = 3;
  stackWidth = Constants.blockWidth;
  stackHeight = Constants.blockHeight.full;
  marginVertical = 15;
  marginHorizontal = 15;
  layoutMarginTop = 15;
  layoutMarginLeft = 15;
  leftOverAlertTimeout: NodeJS.Timeout | null = null;
  blinkAnim: RefAnimation | null = null;

  constructor(props: RefBlockBoardProps) {
    super(props);
    this.state = {
      shouldReset: false,
    }

    this.requiredBlockCount = props.initialMap.map((stack) => {
      return stack.reduce((acc, ele) => ele !== -1 ? acc + 1 : acc, 0) + 2;
    }).reduce((acc, ele) => acc + ele);

    this.stacks = Array(props.initialMap.length);
    this.effectFrames = Array(props.initialMap.length);
    this.getTopPiecePos = this.getTopPiecePos.bind(this);

    this.undock = this.undock.bind(this);

    this.alertUnableToDock = this.alertUnableToDock.bind(this);
    this.dock = this.dock.bind(this);
    this.dockToSelf = this.dockToSelf.bind(this);
    this.dockToOther = this.dockToOther.bind(this);

    this.checkIfStackCompleted = this.checkIfStackCompleted.bind(this);

    this.getCurScore = this.getCurScore.bind(this);
    this.getCompleteMap = this.getCompleteMap.bind(this);
    this.onBlockRendered = this.onBlockRendered.bind(this);
  }

  get completedAllStack() {
    const detailedMap = this.getDetailedMap();
    return detailedMap.filter((status) => status === "incomplete").length === 0;
  }

  get score() {
    const detailedMap = this.getDetailedMap();
    return detailedMap.filter((status) => status === "completed").length;
  }

  onBlockRendered() {
    const {props} = this;
    const {onLayout} = props;
    this.renderedBlockCount += 1;
    if (this.requiredBlockCount === this.renderedBlockCount) {
      if (onLayout) onLayout();
    }
  }

  reset() {
    const {props} = this;
    this.isAnimating = false;
    this.stacks = Array(props.initialMap.length);
    this.effectFrames = Array(props.initialMap.length);
    this.leftOverAlertTimeout = null;
    this.blinkAnim = null;
    this.readyToDock = false;
    this.dockOrigin = null;
    this.setState({
      shouldReset: true,
    })
  }

  getEffectFrame(stackIndex: number) {
    return this.effectFrames[stackIndex];
  }

  checkIfStackCompleted(targetStack: StackModel) {
    // const targetStack = this.stacks[stackIndex];
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
    const completeMap = filledStacks.map((stack) => this.checkIfStackCompleted(stack));
    return completeMap;
  }

  getDetailedMap() {
    const stacks = this.stacks;
    const detailedMap = stacks.map((stack) => {
      const stackLength = stack.pieces.length;
      if (stackLength > 0 && this.checkIfStackCompleted(stack)) {
        return "completed";
      } else if (stackLength === 0) {
        return "blank";
      } else if (stackLength > 0 && !this.checkIfStackCompleted(stack)) {
        return "incomplete";
      }
    })
    return detailedMap;
  }

  getLeftoverIndex() {
    const detailedMap = this.getDetailedMap();
    const gotMaxScore = this.score === this.props.maxScore;
    const hasLeftOver = detailedMap.filter((status) => status === "incomplete").length === 1;
    const leftoverIndex = gotMaxScore && hasLeftOver ? detailedMap.indexOf("incomplete") : -1;
    return leftoverIndex;
  }

  getCurScore() {
    return this.getCompleteMap().filter((bool) => bool).length;
  }

  getTopPiecePos(stackIndex: number) {
    const {
      column,
      stacks,
      scale,
      marginHorizontal,
      marginVertical,
      stackWidth,
      stackHeight,
      layoutMarginLeft,
      layoutMarginTop,
    } = this;
    const targetStack = stacks[stackIndex];
    const stackRow = Math.floor(stackIndex / column);
    const stackColumn = stackIndex % column;
    const curStackLength = targetStack.pieces.length;

    const curPos = {
      x: layoutMarginLeft +
        marginHorizontal +
        (stackWidth + marginHorizontal * 2) * stackColumn,
      y: layoutMarginTop +
        marginVertical +
        (stackHeight + marginVertical * 2) * stackRow +
        Constants.blockHeight.top * scale +
        Constants.blockHeight.piece * scale * Constants.maxStackLength -
        Constants.blockHeight.piece * scale * curStackLength,
    };

    return curPos;
  }

  undock(stackIndex: number) {
    const { props } = this;
    const topPiecePos = this.getTopPiecePos(stackIndex);
    const targetStack = this.stacks[stackIndex];
    const pieceOnTop = targetStack.pieces.pop();

    if (props.onUndock) props.onUndock(stackIndex)

    if (!pieceOnTop || !pieceOnTop.ref.current) {
      return;
    }

    
    targetStack.pieces.push(pieceOnTop);
    let originStackWasCompleted = this.checkIfStackCompleted(targetStack);

    if (originStackWasCompleted && targetStack.capRef.current) {
      const targetStyle = {
        scaleX: 0,
        scaleY: 0,
        top: topPiecePos.y - 20 - Constants.blockHeight.top * this.scale,
      };

      if (props.onCancelCompleteStack) {
        props.onCancelCompleteStack(stackIndex);
      }

      if (props.noAnimation) {
        targetStack.capRef.current.setStyle(targetStyle)
      } else {
        targetStack.capRef.current.setStyle({
          top: topPiecePos.y - Constants.blockHeight.top * this.scale
        })
        targetStack.capRef.current?.animate({
          style: targetStyle,
          duration: 100,
          easing: "easeOutSine",
          fps: this.props.fps || 60,
        }).start();
      }
    }

    this.dockOrigin = targetStack;
    this.readyToDock = true;

    if (props.noAnimation) {
      pieceOnTop.ref.current.setStyle({
        opacity: 1,
        top: topPiecePos.y - 20 * this.scale,
      })
    } else {
      pieceOnTop.ref.current.setStyle({
        opacity: 1,
        top: topPiecePos.y,
      })
      
      const pieceUndockAnim = pieceOnTop.ref.current?.animate({
        style: {
          top: topPiecePos.y - 20 * this.scale,
        },
        duration: 100,
        easing: "easeOutSine",
        fps: this.props.fps || 60,
      })
  
      pieceUndockAnim.start();
    }
  }

  dockToSelf(stackIndex: number) {
    const {props} = this;
    const {stacks, getTopPiecePos} = this;
    const targetStack = stacks[stackIndex];
    const topPiecePos = getTopPiecePos(stackIndex);
    const pieceOnTop = targetStack.pieces.pop();

    if (!pieceOnTop || !pieceOnTop.ref.current) {
      return;
    }
    targetStack.pieces.push(pieceOnTop);

    let originStackWasCompleted = this.checkIfStackCompleted(targetStack);

    let animateCapY, animateCapScale;
    if (originStackWasCompleted && targetStack.capRef.current) {
      if (props.onSelfCompleteStack) {
        props.onSelfCompleteStack(stackIndex);
      }

      if (props.noAnimation) {
        targetStack.capRef.current.setStyle({
          top: topPiecePos.y - Constants.blockHeight.top * this.scale,
          scaleX: 1,
          scaleY: 1,
        });
      } else {
        animateCapY = targetStack.capRef.current.animate({
          style: {
            top: topPiecePos.y - Constants.blockHeight.top * this.scale,
          },
          duration: this.props.dockEasingDuration || defaultDockEasingDuration,
          easing: this.props.dockEasing || defaultDockEasing,
          fps: this.props.fps || 60,
        })
        animateCapScale = targetStack.capRef.current.animate({
          style: {
            scaleX: 1,
            scaleY: 1,
          },
          duration: 300,
          easing: "easeInOutSine",
          fps: this.props.fps || 60,
        });
      }
    }

    this.readyToDock = false;
    this.dockOrigin = null;

    let pieceDockAnim;
    if (props.noAnimation) {
      pieceOnTop.ref.current.setStyle({
        top: topPiecePos.y,
      })
    } else {
      pieceDockAnim = pieceOnTop.ref.current?.animate({
        style: {
          top: topPiecePos.y,
        },
        duration: this.props.dockEasingDuration || defaultDockEasingDuration,
        easing: this.props.dockEasing || defaultDockEasing,
        fps: this.props.fps || 60,
      })
    }

    if (animateCapY && animateCapScale) {
      NativeRefBox.sequence([animateCapScale, animateCapY]).start();
    }

    if (pieceDockAnim) {
      pieceDockAnim.start();
    }
  }

  alertUnableToDock(stackIndex: number) {
    const {props} = this;
    const {stacks, getTopPiecePos} = this;
    const topPiecePos = getTopPiecePos(stackIndex);
    const targetStack = stacks[stackIndex];
    const pieceOnTop = targetStack.pieces.pop();

    if (props.onAlertUnableToDock) {
      props.onAlertUnableToDock(stackIndex);
    }
    
    if (!pieceOnTop) {
      return;
    }
    targetStack.pieces.push(pieceOnTop);
    const targetStackCompleted = this.checkIfStackCompleted(targetStack);
    let animateCapScale;
    if (targetStackCompleted) {
      if (props.noAnimation) {
        targetStack.capRef.current?.setStyle({
          top: topPiecePos.y - Constants.blockHeight.top * this.scale,
        })
      } else {
        targetStack.capRef.current?.setY(
          topPiecePos.y - Constants.blockHeight.piece * this.scale - Constants.blockHeight.top * this.scale,
        );
        animateCapScale = targetStack.capRef.current?.animate({
          style: {
            top: topPiecePos.y - Constants.blockHeight.top * this.scale,
          },
          duration: this.props.dockEasingDuration || defaultDockEasingDuration,
          easing: this.props.dockEasing || defaultDockEasing,
          fps: this.props.fps || 60,
        });
        animateCapScale?.start();
      }
    }

    if (props.noAnimation) {
      pieceOnTop.ref.current?.setStyle({
        top: topPiecePos.y
      })
    } else {
      pieceOnTop.ref.current?.setY(topPiecePos.y - Constants.blockHeight.piece * this.scale);
      pieceOnTop.ref.current?.animate({
        style: {
          top: topPiecePos.y
        },
        duration: this.props.dockEasingDuration || defaultDockEasingDuration,
        easing: this.props.dockEasing || defaultDockEasing,
        fps: this.props.fps || 60,
      }).start();
    }
  }

  dockToOther(stackIndex: number) {
    const {stacks, getTopPiecePos, dockOrigin, props, dockCount} = this;
    const targetStack = stacks[stackIndex];
    const topPiecePos = getTopPiecePos(stackIndex);
    const pieceOnTopOfOrigin = dockOrigin?.pieces.pop();
    const targetStackWasBlank = targetStack.pieces.length === 0;

    if (!pieceOnTopOfOrigin || !pieceOnTopOfOrigin.ref.current) {
      return;
    }

    this.readyToDock = false;
    targetStack.pieces.push(pieceOnTopOfOrigin);
    let targetStackCompleted = this.checkIfStackCompleted(targetStack);

    if (targetStackWasBlank) {
      targetStack.bottomRef.current?.setState({
        type: pieceOnTopOfOrigin.type,
      });
    }

    if (dockOrigin?.pieces.length === 0) {
      dockOrigin.bottomRef.current?.setState({
        type: 50,
      });
    }

    if (targetStackCompleted) {
      targetStack.capBlockRef.current?.setState({
        type: pieceOnTopOfOrigin.type,
      });
    }

    const readyForAppearAnim = () => {
      pieceOnTopOfOrigin.ref.current?.setStyle({
        opacity: 1,
        top: topPiecePos.y - Constants.blockHeight.piece * this.scale - 20 * this.scale,
        left: topPiecePos.x,
        zIndex: targetStack.pieces.length,
      })
    };

    if (props.noAnimation) {
      pieceOnTopOfOrigin.ref.current.setStyle({
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
        left: topPiecePos.x,
        top: topPiecePos.y - Constants.blockHeight.piece * this.scale,
      })
    } else {
      readyForAppearAnim();
      pieceOnTopOfOrigin.ref.current.animate({
        style: {
          scaleX: 1,
          scaleY: 1,
          left: topPiecePos.x,
          top: topPiecePos.y - Constants.blockHeight.piece * this.scale,
        },
        duration: this.props.dockEasingDuration || defaultDockEasingDuration,
        easing: this.props.dockEasing || defaultDockEasing,
        fps: props.fps || 60,
      }).start();
    }

    if (targetStackCompleted && targetStack.capRef.current) {
      if (props.onCompleteStack) {
        props.onCompleteStack(stackIndex);
      }

      const readyForCapAnim = () => {
        targetStack.capRef.current?.setStyle({
          opacity: 1,
          top: topPiecePos.y -
            Constants.blockHeight.piece * this.scale -
            Constants.blockHeight.top * this.scale -
            20,
        })
      };

      if (props.noAnimation) {
        targetStack.capRef.current.setStyle({
          opacity: 1,
          scaleX: 1,
          scaleY: 1,
          top: topPiecePos.y -
            Constants.blockHeight.piece * this.scale -
            Constants.blockHeight.top * this.scale,
        })
      } else {
        readyForCapAnim();
        const effectFrame = this.getEffectFrame(stackIndex);
        effectFrame.current?.blink(chroma("white").alpha(0.5).hex(), 3);
        targetStack.capRef.current.setStyle({
          
        })
        NativeRefBox.sequence([
          targetStack.capRef.current.animate({
            style: {
              scaleX: 1,
              scaleY: 1,
            },
            duration: 100,
            easing: "easeInOutSine",
            fps: props.fps || 60,
          }),
          targetStack.capRef?.current?.animate({
            style: {
              top: topPiecePos.y -
                Constants.blockHeight.piece * this.scale -
                Constants.blockHeight.top * this.scale,
            },
            duration: this.props.dockEasingDuration || defaultDockEasingDuration,
            easing: this.props.dockEasing || defaultDockEasing,
            fps: props.fps || 60,
          }),
        ]).start()
      }
    }

    if (props.onScoreChange) {
      props.onScoreChange(this.score);
    }

    if (this.completedAllStack && props.onComplete) {
      props.onComplete();
    }
  }
  
  dock(stackIndex: number) {
    const {props} = this;
    const {
      stacks,
      dockToSelf,
      dockToOther,
      alertUnableToDock,
      dockOrigin,
    } = this;

    if (this.leftOverAlertTimeout !== null) {
      clearTimeout(this.leftOverAlertTimeout);
    }

    const effectFrame = this.getEffectFrame(stackIndex);
    effectFrame.current?.stopBlink();

    if (props.onDock) {
      props.onDock(stackIndex);
    }

    const targetStack = stacks[stackIndex];
    if (targetStack === dockOrigin) {
      dockToSelf(stackIndex);
    } else if (targetStack.pieces.length === targetStack.max) {
      alertUnableToDock(stackIndex);
    } else {
      dockToOther(stackIndex);
    }

    const leftoverIndex = this.getLeftoverIndex();

    if (leftoverIndex !== -1) {
      this.leftOverAlertTimeout = setTimeout(() => {
        if (props.onLeftOver) {
          props.onLeftOver(leftoverIndex);
          const effectFrame = this.getEffectFrame(leftoverIndex);
          effectFrame.current?.blink(chroma("red").alpha(0.5).hex(), 3);
        }
      }, 1000)
    }

    dockOrigin?.sizeIndicator?.current?.setText(`${dockOrigin.pieces.length} / ${dockOrigin.max}`);
    targetStack.sizeIndicator?.current?.setText(`${targetStack.pieces.length} / ${targetStack.max}`);
    this.dockCount += 1;
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    if (this.state.shouldReset) {
      this.setState({shouldReset: false})
    }
  }

  render() {
    const LazyBlock = React.lazy(() => import('./Block'))

    const {props, onBlockRendered} = this;
    const {
      width = 300,
      height = 300,
    } = props;
    const {
      boardPaddingHorizontal,
      boardPaddingVertical,
      column,
      row,
      scale,
      stackMarginHorizontal: marginHorizontal,
      stackMarginVertical: marginVertical,
    } = getStackLayout({width, height}, props.initialMap.length);

    if (this.state.shouldReset) {
      return <></>;
    }

    const stackWidth = Constants.blockWidth * scale;
    const stackHeight = Constants.blockHeight.full * scale;
    const requiredWidth = (stackWidth + marginHorizontal * 2) * column + boardPaddingHorizontal * 2;
    const requiredHeight = (stackHeight + marginVertical * 2) * row + boardPaddingVertical * 2;
    const leftWidth = width - requiredWidth;
    const leftHeight = height - requiredHeight;
    const layoutMarginLeft = leftWidth / 2 + boardPaddingHorizontal;
    const layoutMarginTop = leftHeight / 2 + boardPaddingVertical;

    this.scale = scale;
    this.stackWidth = stackWidth;
    this.stackHeight = stackHeight;
    this.column = column;
    this.row = row;
    this.marginHorizontal = marginHorizontal;
    this.marginVertical = marginVertical;
    this.layoutMarginLeft = layoutMarginLeft;
    this.layoutMarginTop = layoutMarginTop;

    const layout = Array(row).fill(Array(column).fill(1));

    return (
      <View style={{width, height}}>
        <LayoutContainer style={{paddingLeft: layoutMarginLeft, paddingTop: layoutMarginTop}}>
          {layout.map((row, i) => (
            <Row key={'frameRow' + i} style={{marginVertical}}>
              {row.map((cell: number, j: number) => {
                const stackIndex = layout[0].length * i + j;
                if (props.initialMap[stackIndex] === undefined) {
                  return (
                    <Cell key={'cell' + i + j} scale={scale} style={{marginHorizontal}} />
                  );
                }
                return (
                  <Cell key={'cell' + i + j} scale={scale} style={{marginHorizontal}}>
                    <BlockFrame
                      pieceCount={props.initialMap[stackIndex].length}
                      scale={scale}
                      style={{backgroundColor: 'rgba(0,0,0,0.2)'}}
                    />
                  </Cell>
                );
              })}
            </Row>
          ))}
        </LayoutContainer>
        <LayoutContainer ref={this.layoutRef}>
          {layout.map((row, i) =>
            row.map((cell: number, j: number) => {
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

              const capBlockRef = React.createRef<Block>();
              const capRef = React.createRef<NativeRefBox>();
              const pieces = filteredStack.map((type) => ({
                ref: React.createRef<NativeRefBox>(),
                type,
              }));
              const bottomRef = React.createRef<Block>();
              const sizeIndicator = React.createRef<DynamicText>();
              const stackModel = {
                capBlockRef,
                capRef,
                pieces,
                bottomRef,
                max: curStack.length,
                sizeIndicator,
              };
              this.stacks[stackIndex] = stackModel;
              return (
                <Fragment key={'fragment' + i + j}>
                  {/*This is for indicating stack length*/}
                  {props.showSize
                    ? (
                      <View
                        style={{
                          position: "absolute",
                          left:
                            layoutMarginLeft +
                            marginHorizontal +
                            j * (stackWidth + marginHorizontal * 2),
                          top:
                            layoutMarginTop +
                            marginVertical +
                            i * (stackHeight + marginVertical * 2) +
                            stackHeight -
                            Constants.blockHeight.piece * (curStack.length + 1) * scale -
                            Constants.blockHeight.top * scale -
                            Constants.blockHeight.bottom * scale -
                            10 * scale,
                          // backgroundColor: "white",
                          width: stackWidth,
                          justifyContent: "center",
                          alignItems: "center",
                          height: Constants.blockHeight.piece * scale,
                        }}
                      >
                        <View
                          style={{
                            position: "absolute",
                            borderRadius: 50,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingHorizontal: 10 * scale,
                            backgroundColor: "rgba(0,0,0,0.1)",
                          }
                        }>
                          <DynamicText
                            ref={sizeIndicator}
                            initialValue={`${pieces.length} / ${curStack.length}`}
                            renderer={(text) => (
                              <NotoSans
                                type="Black"
                                size={Math.max(15 * scale, 8)}
                                color="rgba(255,255,255,0.4)"
                              >
                                {text}
                              </NotoSans>
                            )}
                          />
                        </View>
                      </View>
                    ) : (
                      <></>
                    )
                  }
                  {/* This is Block Bottom */}
                  <AbsoluteRefBox
                    // ref={bottomRef}
                    key={'bottom' + i + j}
                    style={{
                      left:
                        layoutMarginLeft +
                        marginHorizontal +
                        j * (stackWidth + marginHorizontal * 2),
                      top:
                        layoutMarginTop +
                        marginVertical +
                        i * (stackHeight + marginVertical * 2) +
                        stackHeight -
                        Constants.blockHeight.bottom * scale,
                    }}>
                    <React.Suspense fallback={(
                      <BlockBase
                        height={34}
                        width={66}
                        scale={scale}
                        color="rgba(255,255,255,0.4)"
                        borderWidth={0.5}
                      />
                    )}>
                      <LazyBlock
                        onReady={onBlockRendered}
                        ref={bottomRef}
                        visible={true}
                        type={filteredStack[0] !== undefined ? filteredStack[0] : 50}
                        skin={props.skin}
                        part="bottom"
                        scale={scale}
                        noGradient={props.noGradient}
                      />
                    </React.Suspense>
                  </AbsoluteRefBox>
                  {/* This is Block Piece */}
                  {filteredStack.map((type, k) => {
                    return (
                      <AbsoluteRefBox
                        key={'piece' + i + j + k}
                        ref={pieces[k].ref}
                        style={{
                          left:
                            layoutMarginLeft +
                            marginHorizontal +
                            j * (stackWidth + marginHorizontal * 2),
                          top:
                            layoutMarginTop +
                            marginVertical +
                            i * (stackHeight + marginVertical * 2) +
                            stackHeight -
                            Constants.blockHeight.bottom * scale -
                            Constants.blockHeight.piece * (k + 1) * scale,
                        }}>
                        <React.Suspense fallback={(
                          <BlockBase
                            height={24}
                            width={66}
                            scale={scale}
                            color="rgba(255,255,255,0.2)"
                            borderWidth={0.5}
                          />
                        )}>
                          <LazyBlock
                            onReady={onBlockRendered}
                            type={type}
                            skin={props.skin}
                            part="piece"
                            scale={scale}
                            noGradient={props.noGradient}
                            />
                        </React.Suspense>
                      </AbsoluteRefBox>
                    );
                  })}
                  <AbsoluteRefBox
                    ref={capRef}
                    key={'cap' + i + j}
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                      left:
                        layoutMarginLeft +
                        marginHorizontal +
                        j * (stackWidth + marginHorizontal * 2),
                      top:
                        layoutMarginTop +
                        marginVertical +
                        i * (stackHeight + marginVertical * 2) +
                        stackHeight -
                        Constants.blockHeight.bottom * scale -
                        Constants.blockHeight.piece * curStack.length * scale -
                        Constants.blockHeight.top * scale,
                      opacity: completed ? 1 : 0,
                    }}>
                    <React.Suspense fallback={(
                      <BlockBase
                        width={66}
                        height={8}
                        scale={scale}
                        color="rgba(255,255,255,0.4)"
                        borderWidth={0.5}
                      />
                    )}>
                      <LazyBlock
                        onReady={onBlockRendered}
                        ref={capBlockRef}
                        type={filteredStack[0] !== undefined ? filteredStack[0] : 50}
                        skin={props.skin}
                        part="top"
                        scale={scale}
                        visible={true}
                        noGradient={props.noGradient}
                      />
                    </React.Suspense>
                  </AbsoluteRefBox>
                </Fragment>
              );
            }),
          )}
        </LayoutContainer>
        <LayoutContainer style={{marginLeft: layoutMarginLeft, marginTop: layoutMarginTop}}>
          {layout.map((row, i) => (
            <Row key={'agentRow' + i} style={{marginVertical}}>
              {row.map((cell: number, j: number) => {
                const stackIndex = layout[0].length * i + j;
                if (props.initialMap[stackIndex] === undefined) {
                  return (
                    <Cell
                      key={'agentRowCell' + i + j}
                      style={{marginHorizontal}}
                      scale={scale}
                    />
                  );
                }
                return (
                  <Cell key={'agentRowCell' + i + j} scale={scale} style={{marginHorizontal}}>
                    <TouchAgent
                      style={{zIndex: 100}}
                      onTouchStart={() => {
                        if (!this.readyToDock) {
                          this.undock(stackIndex);
                        } else {
                          this.dock(stackIndex);
                        }
                      }}>
                      <BlockFrame
                        pieceCount={Constants.maxStackLength}
                        scale={scale}
                      />
                    </TouchAgent>
                  </Cell>
                );
              })}
            </Row>
          ))}
        </LayoutContainer>
        <LayoutContainer style={{paddingLeft: layoutMarginLeft, paddingTop: layoutMarginTop}}>
          {layout.map((row, i) => (
            <Row key={'frameRow' + i} style={{marginVertical}}>
              {row.map((cell: number, j: number) => {
                const frameRef = React.createRef<BlockFrame>();
                const stackIndex = layout[0].length * i + j;
                this.effectFrames[stackIndex] = frameRef;

                if (props.initialMap[stackIndex] === undefined) {
                  return (
                    <Cell key={'cell' + i + j} scale={scale} style={{marginHorizontal}} />
                  );
                }
                return (
                  <Cell key={'cell' + i + j} scale={scale} style={{marginHorizontal}}>
                    <BlockFrame
                      ref={frameRef}
                      pieceCount={props.initialMap[stackIndex].length}
                      scale={scale}
                      style={{backgroundColor: "red", opacity: 0, zIndex: 10}}
                      animated
                    />
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
