import React from 'react';
import {View, Text} from 'react-native';
import Block from '../Block';
import TopBase from '../Block/TopBase';
import BottomBase from '../Block/BottomBase';
import PieceBase from '../Block/PieceBase';
import skinMap, {skins} from '../BlockStack/skinMap';
import {BlockTypes} from '../Block/Types';

type ScoreIconProps = {
  skin: skins;
  scale: number;
  type: BlockTypes;
};

const ScoreIcon: React.FC<ScoreIconProps> = (props) => {
  return (
    <View>
      <Block
        shape={skinMap[props.skin].top}
        base={TopBase}
        type={props.type}
        scale={props.scale}
      />
      <Block
        shape={skinMap[props.skin].piece}
        base={PieceBase}
        type={props.type}
        scale={props.scale}
      />
      <Block
        shape={skinMap[props.skin].bottom}
        base={BottomBase}
        type={props.type}
        scale={props.scale}
      />
    </View>
  );
};

export default ScoreIcon;
