import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Path, Rect} from 'react-native-svg';
import styled from 'styled-components';
import {BlockTypes, BasicBlockProps} from '../Types';
import colorTheme from './_ColorTheme';
import SvgContainer from '../SvgContainer';

const SpikyBottom: React.FC<BasicBlockProps> = (props) => {
  const {bottomFill, feet} = colorTheme[props.type];
  const { scale = 1 } = props;

  return (
    <SvgContainer
      height={24}
      marginLeft={0}
      innerMarginTop={0}
      scale={scale}>
      <Svg
        width={78 * scale}
        height={34 * scale}
        viewBox="0 0 78 34">
        <Path d="M1 1V33H65V1H49V9H17V1H1Z" fill={bottomFill} stroke="black" />
        <Rect x="12" y="25" width="5" height="8" fill={feet} stroke="black" />
        <Rect x="49" y="25" width="5" height="8" fill={feet} stroke="black" />
      </Svg>
    </SvgContainer>
  );
};

SpikyBottom.defaultProps = {
  scale: 1,
};

export default SpikyBottom;