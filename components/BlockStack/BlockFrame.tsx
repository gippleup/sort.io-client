import React from 'react';
import {View, Text} from 'react-native';
import Constants from '../../assets/Constants';

type BlockFrameProps = {
  pieceCount: number;
  scale: number;
};

const BlockFrame: React.FC<BlockFrameProps> = (props) => {
  const bgColor = 'rgba(0, 0, 0, 0.5)';
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
      }}
    />
  );
};

export default BlockFrame;
