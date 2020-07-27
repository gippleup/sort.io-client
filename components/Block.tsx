import React from 'react'
import { View, Text } from 'react-native'
import Svg from 'react-native-svg';

type BlockProps = {
  base: Svg;
  shape: Svg;
};
const Block = (props: BlockProps) => {
  return (
    <View>
      <Svg>
        {props.base}
        {props.shape}
      </Svg>
    </View>
  );
};

export default Block;
