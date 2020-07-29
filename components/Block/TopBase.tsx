import React from 'react';
import {View, Text} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import styled from 'styled-components';
import {BasicBlockProps, BlockTypes} from './Types';
import colors from './ColorTheme';
import SvgContainer from './SvgContainer';

const TopBase: React.FC<BasicBlockProps> = (props) => {
  const {fill} = colors[props.type];
  return (
    <SvgContainer
      height={8}
      innerMarginTop={0}
      marginLeft={0}
      scale={props.scale}>
      <Svg
        width={66 * props.scale}
        height={34 * props.scale}
        viewBox="0 0 66 34"
        fill="none">
        <Path d="M1 1V9H17V17H49V9H65V1H1Z" fill={fill} stroke="black" />
      </Svg>
    </SvgContainer>
  );
};

export default TopBase;
