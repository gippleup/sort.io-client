import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Path, Rect} from 'react-native-svg';
import styled from 'styled-components';
import colorTheme from './ColorTheme';
import {BasicBlockProps} from '../Types';
import SvgContainer from '../SvgContainer';

const SpikyTop = (props: BasicBlockProps) => {
  const {cap} = colorTheme[props.type];
  return (
    <SvgContainer
      innerMarginTop={0}
      height={24}
      marginLeft={0}
      scale={props.scale}>
      <Svg
        width={78 * props.scale}
        height={34 * props.scale}
        viewBox="0 0 78 34">
        <Path d="M1 1V9H17V17H49V9H65V1H1Z" fill={cap} stroke="black" />
      </Svg>
    </SvgContainer>
  );
};

export default SpikyTop;
