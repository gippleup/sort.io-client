import React, { RefObject } from 'react'
import { View, Text } from 'react-native'
import Block from './Block';
import NativeRefBox from './NativeRefBox';
import StrokedText from './StrokedText';
import chroma from 'chroma-js';
import { SupportedSkin } from './Block/skinMap';

type LoadingProps = {
  checkIfLoaded: () => boolean;
  onAnimationCompleted?: () => any;
  onLastAnimationStarted?: () => any;
  skin?: SupportedSkin;
}


const scaleOnComplete = 1.5;

class Loading extends React.Component<LoadingProps> {
  topRef = React.createRef<Block>();
  pieceRef = React.createRef<Block>();
  bottomRef = React.createRef<Block>();
  refBoxTopRef = React.createRef<NativeRefBox>();
  refBoxPieceRef = React.createRef<NativeRefBox>();
  refBoxBottomRef = React.createRef<NativeRefBox>();
  refBoxBlockRef = React.createRef<NativeRefBox>();
  exclaimerRef = React.createRef<NativeRefBox>();

  constructor(props: Readonly<LoadingProps>) {
    super(props);

    this.scaleUpBlock = this.scaleUpBlock.bind(this);
    this.setPieceColorRandom = this.setPieceColorRandom.bind(this);
    this.undockPiece = this.undockPiece.bind(this);
    this.changePiece = this.changePiece.bind(this);
    this.dockCap = this.dockCap.bind(this);
    this.dockPiece = this.dockPiece.bind(this);
    this.popExclaimer = this.popExclaimer.bind(this);
    this.scaleUpBlock = this.scaleUpBlock.bind(this);
    this.setBlockType = this.setBlockType.bind(this);
    this.setPieceColorRandom = this.setPieceColorRandom.bind(this);
    this.undockPiece = this.undockPiece.bind(this);
  }

  setBlockType(blockRef: RefObject<Block>, type: number) {
    blockRef.current?.setState({
      type: type,
    })
  }

  setPieceColorRandom() {
    const {setBlockType, pieceRef} = this;
    const getRandomTypeOtherThan1 = () => {
      return 1 + Math.ceil(Math.random() * 16);
    }
    setBlockType(pieceRef, getRandomTypeOtherThan1())
  }
  
  dockCap() {
    const {refBoxTopRef} = this;
    refBoxTopRef.current?.setOpacity(1);
    refBoxTopRef.current?.animate({
      style: {
        top: 0,
      },
      duration: 500,
      easing: "easeOutBounce",
      fps: 60,
    }).start();
  }

  undockPiece(onComplete?: () => void) {
    const {refBoxPieceRef} = this;
    refBoxPieceRef.current?.animate({
      style: {
        top: -20,
      },
      duration: 200,
      easing: "easeInOutSine",
      fps: 60
    }).start(() => {
      refBoxPieceRef.current?.animate({
        style: {
          opacity: 0,
        },
        duration: 200,
        easing: "easeInOutSine",
        fps: 60,
      }).start(onComplete);
    });
  }

  dockPiece(onComplete?: () => void) {
    const {refBoxPieceRef} = this;
    refBoxPieceRef.current?.animate({
      style: {
        opacity: 1,
      },
      duration: 500,
      easing: "easeInOutSine",
      fps: 60,
    }).start(() => {
      refBoxPieceRef.current?.animate({
        style: {
          top: 0,
        },
        duration: 300,
        easing: "easeOutBounce",
        fps: 60,
      }).start(onComplete);
    });
  }

  popExclaimer() {
    const {exclaimerRef} = this;
    exclaimerRef.current?.animate({
      style: {
        top: 0,
        opacity: 1,
      },
      duration: 800,
      easing: "easeOutElastic",
    }).start();
  }
  
  scaleUpBlock(callback?: () => any) {
    const {refBoxBlockRef} = this;
    refBoxBlockRef.current?.animate({
      style: {
        scaleX: scaleOnComplete,
        scaleY: scaleOnComplete,
        translateY: -30,
      },
      duration: 500,
      easing: "easeOutElastic",
    }).start(() => {
      if (callback) {
        callback();
      }
    });
  }

  changePiece(callback?: () => any) {
    const {
      undockPiece,
      setPieceColorRandom,
      dockPiece,
      setBlockType,
      pieceRef,
      dockCap,
      popExclaimer,
      scaleUpBlock,
    } = this;

    const {props} = this;

    const {
      checkIfLoaded,
      onLastAnimationStarted,
      onAnimationCompleted
    } = props;

    const isLoaded = checkIfLoaded();

    if (!isLoaded) {
      undockPiece(() => {
        setPieceColorRandom();
        dockPiece(callback)
      });
    } else {
      undockPiece(() => {
        setBlockType(pieceRef, 1);
        dockPiece(() => {
          if (onLastAnimationStarted) {
            onLastAnimationStarted();
          }
          dockCap();
          popExclaimer();
          scaleUpBlock(() => {
            if (onAnimationCompleted) {
              onAnimationCompleted();
            }
          })          
        });
      });
    }
  }

  componentDidMount() {
    const {
      exclaimerRef,
      refBoxBlockRef,
      setBlockType,
      topRef,
      refBoxTopRef,
      changePiece,
    } = this;
    exclaimerRef.current?.setStyle({
      alignItems: 'center', top: 50, opacity: 0
    })

    refBoxBlockRef.current?.setStyle({
      scaleX: 1,
      scaleY: 1,
      translateY: 0,
    })

    setBlockType(topRef, 10);

    refBoxTopRef.current?.setStyle({
      opacity: 0,
      top: -20
    })

    let neverStopChange = () => {
      changePiece(() => {
        changePiece(neverStopChange)
      })
    } 

    neverStopChange();

    return () => {
      neverStopChange = () => {}
    }
  }

  render() {
    const {
      topRef,
      pieceRef,
      bottomRef,
      refBoxTopRef,
      refBoxPieceRef,
      refBoxBottomRef,
      refBoxBlockRef,
      exclaimerRef,
    } = this;

    const {props} = this;

    const {
      checkIfLoaded,
      onAnimationCompleted,
      onLastAnimationStarted,
      skin = "basic",
    } = props;

    return (
      <NativeRefBox ref={refBoxBlockRef}>
        <NativeRefBox ref={exclaimerRef}>
          <StrokedText
            text="!"
            dyMultiplier={0.36}
            fillColor={
              chroma("yellowgreen")
                .set("hsl.l", 0.5)
                .set("hsl.s", 1)
                .hex()
            }
            fontFamily="NotoSansKR-Black"
            height={40}
            fontSize={30}
            strokeColor="black"
            strokeWidth={5}
            width={20}
          />
        </NativeRefBox>
        <NativeRefBox ref={refBoxTopRef} style={{ opacity: 0 }}>
          <Block
            ref={topRef}
            skin={skin}
            part="top"
            scale={1}
            type={1}
          />
        </NativeRefBox>
        <NativeRefBox ref={refBoxPieceRef}>
          <Block
            ref={pieceRef}
            skin={skin}
            part="piece"
            scale={1}
            type={1}
          />
        </NativeRefBox>
        <NativeRefBox ref={refBoxBottomRef}>
          <Block
            ref={bottomRef}
            skin={skin}
            part="bottom"
            scale={1}
            type={1}
          />
        </NativeRefBox>
      </NativeRefBox>
    )
  }
}

export default Loading
