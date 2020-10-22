/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text } from 'react-native';

type SvgContainerType = {
  scale: number;
  height: number;
  marginLeft: number;
  marginRight?: number;
  marginBottom?: number;
  marginTop?: number;
  innerMarginTop: number;
  innerMarginBottom?: number;
  innerMarginLeft?: number;
  innerMarginRight?: number;
};


const SvgContainer: React.FC<SvgContainerType> = (props) => {
  return (
    <View
      style={{
        height: props.height * props.scale,
        marginLeft: props.marginLeft * props.scale,
        marginRight: props.marginRight ? props.marginRight * props.scale : undefined,
        marginTop: props.marginTop ? props.marginTop * props.scale : undefined,
        marginBottom: props.marginBottom ? props.marginBottom * props.scale : undefined,
      }}>
        <View
          style={{
            marginTop: props.innerMarginTop,
            marginBottom: props.innerMarginBottom ? props.innerMarginBottom * props.scale : undefined,
            marginLeft: props.innerMarginLeft ? props.innerMarginLeft * props.scale : undefined,
            marginRight: props.innerMarginRight ? props.innerMarginRight * props.scale : undefined,
        }}>
          {props.children}
        </View>
    </View>
  );
};

export default SvgContainer;
