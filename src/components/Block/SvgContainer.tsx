/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text } from 'react-native';

type SvgContainerType = {
  scale: number;
  height: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
  marginTop?: number;
  innerMarginTop?: number;
  innerMarginBottom?: number;
  innerMarginLeft?: number;
  innerMarginRight?: number;
};


const SvgContainer: React.FC<SvgContainerType> = (props) => {
  const {
    children,
    scale,
    height,
    innerMarginBottom = 0,
    innerMarginLeft = 0,
    innerMarginRight = 0,
    innerMarginTop = 0,
    marginBottom = 0,
    marginLeft = 0,
    marginRight = 0,
    marginTop = 0,
  } = props;
  return (
    <View
      style={{
        height: height * scale,
        marginLeft: marginLeft * scale,
        marginRight: marginRight * scale,
        marginTop: marginTop * scale,
        marginBottom: marginBottom * scale,
      }}>
        <View
          style={{
            marginTop: innerMarginTop * scale,
            marginBottom: innerMarginBottom * scale,
            marginLeft: innerMarginLeft * scale,
            marginRight: innerMarginRight * scale,
        }}>
          {children}
        </View>
    </View>
  );
};

export default SvgContainer;
