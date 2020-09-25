import React from 'react';
import {View, Text} from 'react-native';
import Block from '../Block';
import {skins} from '../Block/skinMap';
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
        skin={props.skin}
        part="top"
        type={props.type}
        scale={props.scale}
      />
      <Block
        skin={props.skin}
        part="piece"
        type={props.type}
        scale={props.scale}
      />
      <Block
        skin={props.skin}
        part="bottom"
        type={props.type}
        scale={props.scale}
      />
    </View>
  );
};

export default ScoreIcon;
