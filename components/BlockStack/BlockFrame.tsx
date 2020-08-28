import React from 'react';
import {View, Text} from 'react-native';
import Constants from '../../assets/Constants';

type BlockFrameProps = {
  pieceCount: number;
  scale: number;
};

const BlockFrame: React.FC<BlockFrameProps> = (props) => {
  const bgColor = 'rgba(20, 20, 20, 0.5)';
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
        borderWidth: 0.5,
        borderColor: 'rgba(255,255,255,0.2)'
      }}
    />
  );
};

export default BlockFrame;
