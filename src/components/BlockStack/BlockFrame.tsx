import chroma from 'chroma-js';
import React from 'react';
import {View, Text, ViewStyle, Animated} from 'react-native';
import Constants from '../../assets/Constants';
import NativeRefBox from '../NativeRefBox';

type BlockFrameProps = {
  pieceCount: number;
  scale: number;
  style?: Omit<ViewStyle, "width" | "height">;
  animated?: boolean;
};


class BlockFrame extends React.Component<BlockFrameProps> {
  frameRef = React.createRef<NativeRefBox>();
  blink(color: string, iterations: number = 2) {
    this.frameRef.current?.setStyle({
      backgroundColor: color,
    })
    const on = this.frameRef.current?.animate({
      style: {opacity: 1},
      duration: 50,
      easing: "easeOutSine",
    })
    const off = this.frameRef.current?.animate({
      style: {opacity: 0},
      duration: 50,
      easing: "easeOutSine",
    })
    NativeRefBox.loop(NativeRefBox.sequence([on, off]), iterations).start();
  }

  render() {
    const {
      style,
      scale,
      pieceCount,
      animated = false,
    } = this.props;

    const commonStyle = {
      width: Constants.blockWidth * scale,
      height:
        (Constants.blockHeight.bottom +
          Constants.blockHeight.top +
          Constants.blockHeight.piece * pieceCount) *
        scale,
      ...style,
    }

    if (animated) {
      return (
        <NativeRefBox
          ref={this.frameRef}
          style={{
            ...commonStyle,
          }}
        />
      );
    } else {
      return (
        <View
          style={{
            ...commonStyle,
          }}
        />
      )
    }
  }
};

export default BlockFrame;
