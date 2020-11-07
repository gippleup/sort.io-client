import chroma from 'chroma-js';
import React from 'react';
import {View, Text, ViewStyle} from 'react-native';
import Constants from '../../assets/Constants';

type BlockFrameProps = {
  pieceCount: number;
  scale: number;
  style?: Omit<ViewStyle, "width" | "height">
};

const BlockFrame: React.FC<BlockFrameProps> = (props) => {
  const {
    style,
  } = props;
  return (
    <View
      style={{
        width: Constants.blockWidth * props.scale,
        height:
          (Constants.blockHeight.bottom +
            Constants.blockHeight.top +
            Constants.blockHeight.piece * props.pieceCount) *
          props.scale,
        ...style,
      }}
    />
  );
};

export default BlockFrame;
