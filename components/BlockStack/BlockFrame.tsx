import chroma from 'chroma-js';
import React from 'react';
import {View, Text} from 'react-native';
import Constants from '../../assets/Constants';

type BlockFrameProps = {
  pieceCount: number;
  scale: number;
};

const BlockFrame: React.FC<BlockFrameProps> = (props) => {
  const bgColor = chroma("black")
    .alpha(0.5)
    .hex();
  return (
    <View
      style={{
        width: Constants.blockWidth * props.scale,
        height:
          (Constants.blockHeight.bottom +
            Constants.blockHeight.top +
            Constants.blockHeight.piece * props.pieceCount) *
          props.scale,
        backgroundColor: bgColor,
        borderWidth: 1,
        borderColor: chroma("royalblue")
          .alpha(0.8)
          .set('hsl.l', 0.2)
          .hex()
      }}
    />
  );
};

export default BlockFrame;
