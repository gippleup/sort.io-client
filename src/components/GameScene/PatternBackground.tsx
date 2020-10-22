import React from 'react';
import {View, Text, Dimensions, Image, ImageSourcePropType, ViewStyle} from 'react-native';

type PatternBackgroundProps = {
  source: ImageSourcePropType;
};

const PatternBackground: React.FC<PatternBackgroundProps> = (props) => {
  return (
    <Image
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
      }}
      resizeMethod="resize"
      resizeMode="repeat"
      source={props.source}
    />
  );
};

export default PatternBackground;
