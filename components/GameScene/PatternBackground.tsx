import React from 'react';
import {View, Text, Dimensions, Image, ImageSourcePropType, ViewStyle} from 'react-native';

type PatternBackgroundProps = {
  source: ImageSourcePropType;
  width: number;
  height: number;
  scale: number;
  style?: ViewStyle;
};

const PatternBackground: React.FC<PatternBackgroundProps> = (props) => {
  const [imageLayout, setImageLayout] = React.useState<null | {
    width: number;
    height: number;
  }>(null);

  const columnCount = imageLayout
    ? Math.ceil(props.width / (imageLayout?.width * props.scale))
    : 1;

  const rowCount = imageLayout
    ? Math.ceil(props.height / (imageLayout?.height * props.scale))
    : 1;

  const layout = Array(rowCount)
    .fill(1)
    .map(() => Array(columnCount).fill(1));

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        position: 'absolute',
        width: props.width,
        height: props.height,
        overflow: 'hidden',
        ...props.style,
      }}>
      {layout.map((row, i) => (
        // eslint-disable-next-line react-native/no-inline-styles
        <View key={'row' + i} style={{flexDirection: 'row'}}>
          {row.map((column, j) => (
            <Image
              onLayout={(e) => {
                if (!imageLayout) {
                  setImageLayout(e.nativeEvent.layout);
                }
              }}
              key={'image' + i + j}
              style={[
                imageLayout
                  ? {
                      width: imageLayout.width * props.scale,
                      height: imageLayout.height * props.scale,
                    }
                  : {},
              ]}
              source={props.source}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

export default PatternBackground;
