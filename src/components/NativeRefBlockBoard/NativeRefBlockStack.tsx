import { scale } from 'chroma-js';
import React, { Component, Fragment, RefObject } from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components';
import Constants from '../../assets/Constants';
import skin from '../../Language/en/skin';
import Block from '../Block';
import BlockBase from '../Block/BlockBase';
import { SupportedSkin } from '../Block/skinMap';
import { BlockTypes } from '../Block/Types';
import NativeRefBox from '../NativeRefBox';
import { Easings } from '../NativeRefBox/easings';

const AbsoluteRefBox: typeof NativeRefBox = styled(NativeRefBox)`
  position: absolute;
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
};

type NativeRefBlockStackProps = {
  stack: number[];
  noGradient?: boolean;
  metrics: {
    row: number;
    column: number;
    scale: number;
    stackWidth: number;
    stackHeight: number;
    marginHorizontal: number;
    marginVertical: number;
    layoutMarginLeft: number;
    layoutMarginTop: number;
  };
  skin?: SupportedSkin;
  columnIndex: number;
  rowIndex: number;
  onCaptureModel?: (model: StackModel) => any;
  noAnimation?: boolean;
  fps?: number;
}

const defaultDockEasing: Easings = "easeInOutSine";
const defaultDockEasingDuration = 100;

export class NativeRefBlockStack extends Component<NativeRefBlockStackProps>{
  stackModel: StackModel;
  capRef = React.createRef<NativeRefBox>();
  capBlockRef = React.createRef<Block>();
  bottomRef = React.createRef<Block>();
  pieces: PieceModel[];
  constructor(props: Readonly<NativeRefBlockStackProps>) {
    super(props);

    const {stack} = props;
    const filteredStack = stack.filter((type) => type !== -1);
    this.pieces = filteredStack.map((type) => ({
      ref: React.createRef<NativeRefBox>(),
      type,
    }));
    const stackModel = {
      capBlockRef: this.capBlockRef,
      capRef: this.capRef,
      pieces: this.pieces,
      bottomRef: this.bottomRef,
      max: stack.length,
    };

    if (props.onCaptureModel) {
      props.onCaptureModel(stackModel);
    }

    this.stackModel = stackModel;
  }

  get completed() {
    const {stackModel} = this;
    let stackCompleted = stackModel.pieces.length === stackModel.max;
    stackModel.pieces.forEach((piece) => {
      if (piece.type !== stackModel.pieces[0].type) {
        stackCompleted = false;
      }
    });
    return stackCompleted;
  }

  get status() {
    if (this.pieces.length === 0) return "blank";
    if (this.completed) return "completed";
    if (this.pieces.length === this.stackModel.max) return "full";
    if (!this.completed) return "incomplete";
  }

  getTopPiecePos() {
    const {stackModel} = this;
    const {
      metrics,
      stack,
      columnIndex,
      rowIndex,
    } = this.props;
    const {
      column,
      scale,
      marginHorizontal,
      marginVertical,
      stackWidth,
      stackHeight,
      layoutMarginLeft,
      layoutMarginTop,
    } = metrics;
    const curStackLength = stackModel.pieces.length;

    const curPos = {
      x: layoutMarginLeft +
        marginHorizontal +
        (stackWidth + marginHorizontal * 2) * rowIndex,
      y: layoutMarginTop +
        marginVertical +
        (stackHeight + marginVertical * 2) * columnIndex +
        Constants.blockHeight.top * scale +
        Constants.blockHeight.piece * scale * Constants.maxStackLength -
        Constants.blockHeight.piece * scale * curStackLength,
    };

    return curPos;
  }

  hideCap() {
    const { props, stackModel } = this;
    const { noAnimation, metrics, fps = 60 } = props;
    const topPiecePos = this.getTopPiecePos();
    const capRef = stackModel.capRef.current;

    if (!capRef) return;

    const startY = topPiecePos.y - Constants.blockHeight.top * metrics.scale;
    const endY = topPiecePos.y - 20 - Constants.blockHeight.top * metrics.scale;
    const targetStyle = {
      scaleX: 0,
      scaleY: 0,
      top: endY,
    };

    if (noAnimation) {
      capRef.setStyle(targetStyle)
    } else {
      capRef.setStyle({ top: startY })
      capRef.animate({
        style: targetStyle,
        duration: 100,
        easing: "easeOutSine",
        fps: fps || 60,
      }).start();
    }
  }

  undockPiece() {
    const { props, stackModel } = this;
    const { noAnimation, metrics, fps = 60 } = props;
    const topPiecePos = this.getTopPiecePos();
    const pieceOnTop = stackModel.pieces[stackModel.pieces.length - 1];

    if (!pieceOnTop || !pieceOnTop.ref.current) {
      return;
    }

    if (noAnimation) {
      pieceOnTop.ref.current.setStyle({
        opacity: 1,
        top: topPiecePos.y - 20 * metrics.scale,
      })
    } else {
      pieceOnTop.ref.current.setStyle({
        opacity: 1,
        top: topPiecePos.y,
      })
      
      const pieceUndockAnim = pieceOnTop.ref.current?.animate({
        style: {
          top: topPiecePos.y - 20 * metrics.scale,
        },
        duration: 100,
        easing: "easeOutSine",
        fps: fps || 60,
      })
  
      pieceUndockAnim.start();
    }
  }

  undock() {
    const { props, stackModel, completed } = this;
    const capRef = stackModel.capRef.current;

    if (completed && capRef) {
      this.hideCap();
      // if (onCancelCompleteStack) {
      //   onCancelCompleteStack(stackIndex);
      // }
    }

    this.undockPiece();  
  }

  dockCap() {
    const topPiecePos = this.getTopPiecePos();
    const pieceOnTopOfOrigin = this.pieces[this.pieces.length - 1];
    const {props} = this;
    const {metrics} = props;
    const {
      scale,
    } = metrics;

    if (
      !pieceOnTopOfOrigin
      || !pieceOnTopOfOrigin.ref.current
      || !topPiecePos
      || !this.capRef.current
    ) {
      return;
    }
    
    const readyForCapAnim = () => {
      this.capRef.current?.setStyle({
        opacity: 1,
        top: topPiecePos.y -
          Constants.blockHeight.piece * scale -
          Constants.blockHeight.top * scale -
          20,
      })
    };

    if (props.noAnimation) {
      this.capRef.current.setStyle({
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
        top: topPiecePos.y -
          Constants.blockHeight.piece * scale -
          Constants.blockHeight.top * scale,
      })
    } else {
      readyForCapAnim();
      this.capRef.current.setStyle({
        
      })
      NativeRefBox.sequence([
        this.capRef.current.animate({
          style: {
            scaleX: 1,
            scaleY: 1,
          },
          duration: 100,
          easing: "easeInOutSine",
          fps: props.fps || 60,
        }),
        this.capRef?.current?.animate({
          style: {
            top: topPiecePos.y -
              Constants.blockHeight.piece * scale -
              Constants.blockHeight.top * scale,
          },
          duration: 100,
          easing: "easeOutSine",
          fps: props.fps || 60,
        }),
      ]).start()
    }
  }

  dockPiece(target: NativeRefBlockStack, topPiecePos: {x: number, y: number}) {
    const pieceOnTopOfOrigin = this.pieces.pop();
    const {props} = this;
    const {metrics} = props;
    const {
      scale,
    } = metrics;

    if (!pieceOnTopOfOrigin || !pieceOnTopOfOrigin.ref.current || !topPiecePos) {
      return;
    }

    const readyForAppearAnim = () => {
      pieceOnTopOfOrigin.ref.current?.stopAnimation();
      pieceOnTopOfOrigin.ref.current?.setStyle({
        opacity: 1,
        top: topPiecePos.y - Constants.blockHeight.piece * scale - 20 * scale,
        left: topPiecePos.x,
        zIndex: target.pieces.length,
      })
    };

    if (props.noAnimation) {
      pieceOnTopOfOrigin.ref.current.setStyle({
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
        left: topPiecePos.x,
        top: topPiecePos.y - Constants.blockHeight.piece * scale,
      })
    } else {
      readyForAppearAnim();
      NativeRefBox.sequence([
        pieceOnTopOfOrigin.ref.current.animate({
          style: {
            scaleX: 1,
            scaleY: 0.7,
            left: topPiecePos.x,
            top: topPiecePos.y - Constants.blockHeight.piece * 0.7 * scale,
          },
          duration: 100,
          easing: "easeOutSine",
          fps: props.fps || 60,
        }),
        pieceOnTopOfOrigin.ref.current.animate({
          style: {
            scaleY: 1,
            top: topPiecePos.y - Constants.blockHeight.piece * scale,
          },
          duration: 500,
          easing: "easeOutElastic",
          fps: props.fps || 60,
        })
      ]).start();
    }
  }

  alertUnableToDock() {
    const {props, stackModel} = this;
    const topPiecePos = this.getTopPiecePos();
    const pieceOnTop = stackModel.pieces[stackModel.pieces.length - 1];
    const {
      scale,
    } = props.metrics;

    if (!pieceOnTop || !topPiecePos) {
      return;
    }

    let animateCapScale;
    if (this.completed) {
      if (props.noAnimation) {
        this.capRef.current?.setStyle({
          top: topPiecePos.y - Constants.blockHeight.top * scale,
        })
      } else {
        this.capRef.current?.setY(
          topPiecePos.y - Constants.blockHeight.piece * scale - Constants.blockHeight.top * scale,
        );
        animateCapScale = this.capRef.current?.animate({
          style: {
            top: topPiecePos.y - Constants.blockHeight.top * scale,
          },
          duration: 200,
          easing: "easeOutSine",
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
      pieceOnTop.ref.current?.setY(topPiecePos.y - Constants.blockHeight.piece * scale);
      pieceOnTop.ref.current?.animate({
        style: {
          top: topPiecePos.y
        },
        duration: 200,
        easing: "easeOutSine",
        fps: this.props.fps || 60,
      }).start();
    }
  }

  dockToSelf(option: {
    onSelfComplete?: () => any,
    onCompleteDock?: () => any,
  }) {
    const {props} = this;
    const targetStack = this.stackModel;
    const topPiecePos = this.getTopPiecePos();
    const pieceOnTop = targetStack.pieces[targetStack.pieces.length - 1];
    const {scale} = props.metrics;
    const {onSelfComplete, onCompleteDock} = option;

    if (!pieceOnTop || !pieceOnTop.ref.current || !topPiecePos) {
      return;
    }

    let animateCapY, animateCapScale;
    if (this.completed && targetStack.capRef.current) {
      if (onSelfComplete) onSelfComplete();
      if (props.noAnimation) {
        targetStack.capRef.current.setStyle({
          top: topPiecePos.y - Constants.blockHeight.top * scale,
          scaleX: 1,
          scaleY: 1,
        });
      } else {
        animateCapY = targetStack.capRef.current.animate({
          style: {
            top: topPiecePos.y - Constants.blockHeight.top * scale,
          },
          duration: 200,
          easing: "easeOutSine",
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
        duration: 200,
        easing: "easeOutSine",
        fps: this.props.fps || 60,
      })
    }

    if (animateCapY && animateCapScale) {
      NativeRefBox.sequence([animateCapScale, animateCapY]).start();
    }

    if (pieceDockAnim) {
      pieceDockAnim.start();
    }

    if (onCompleteDock) onCompleteDock();
  }

  static dockToOther(option: {
    origin: NativeRefBlockStack,
    target: NativeRefBlockStack,
    onCompleteStack?: () => any,
    onCompleteDock?: () => any,
  }) {
    const {origin, target, onCompleteStack, onCompleteDock} = option;
    const topPiecePos = target.getTopPiecePos();
    const pieceOnTopOfOrigin = origin.pieces[origin.pieces.length - 1];
    const targetWasBlank = target.pieces.length === 0;
    
    if (!pieceOnTopOfOrigin || !pieceOnTopOfOrigin.ref.current || !topPiecePos) {
      return;
    }

    target.pieces.push(pieceOnTopOfOrigin);
    let targetCompleted = target.completed;

    if (targetWasBlank) {
      target.bottomRef.current?.setState({
        type: pieceOnTopOfOrigin.type,
      });
    }

    if (origin.pieces.length === 0) {
      origin.bottomRef.current?.setState({
        type: 50,
      });
    }

    if (targetCompleted) {
      target.capBlockRef.current?.setState({
        type: pieceOnTopOfOrigin.type,
      });
    }

    origin.dockPiece(target, topPiecePos);

    if (targetCompleted) {
      target.dockCap();
      if (onCompleteStack) onCompleteStack();
    }

    if (onCompleteDock) onCompleteDock();
  }

  render() {
    const {
      bottomRef,
      capBlockRef,
      capRef,
      pieces,
    } = this;

    const {
      stack,
      noGradient,
      metrics,
      skin = "basic",
      columnIndex: i,
      rowIndex: j,
    } = this.props;

    const {
      layoutMarginLeft,
      layoutMarginTop,
      marginHorizontal,
      marginVertical,
      scale,
      stackHeight,
      stackWidth,
    } = metrics;

    const LazyBlock = React.lazy(() => import('../Block'));
    const filteredStack = stack.filter((type) => type !== -1);

    const checker: {[index: number]: boolean} = {};
    filteredStack.forEach((type) => (checker[type] = true));
    const completed =
      Object.keys(checker).length === 1 &&
      filteredStack.length === stack.length;

    return (
      <View>
        <Fragment key={'fragment' + i + j}>
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
                ref={bottomRef}
                visible={true}
                type={filteredStack[0] !== undefined ? filteredStack[0] : 50}
                skin={skin}
                part="bottom"
                scale={scale}
                noGradient={noGradient}
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
                    type={type}
                    skin={skin}
                    part="piece"
                    scale={scale}
                    noGradient={noGradient}
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
                Constants.blockHeight.piece * stack.length * scale -
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
                ref={capBlockRef}
                type={filteredStack[0] !== undefined ? filteredStack[0] : 50}
                skin={skin}
                part="top"
                scale={scale}
                visible={true}
                noGradient={noGradient}
              />
            </React.Suspense>
          </AbsoluteRefBox>
        </Fragment>
      </View>
    )
  }
}

export default NativeRefBlockStack
