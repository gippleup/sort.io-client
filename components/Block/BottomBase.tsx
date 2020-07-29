import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import styled from 'styled-components';
import {BasicBlockProps} from './Types';
import colors from './ColorTheme';
import SvgContainer from './SvgContainer';

const BottomBase: React.FC<BasicBlockProps> = (props) => {
  const {fill} = colors[props.type];
  return (
    <SvgContainer
      innerMarginTop={0}
      scale={props.scale}
      marginLeft={0}
      height={34}>
      <Svg
        width={66 * props.scale}
        height={34 * props.scale}
        viewBox="0 0 66 34"
        fill="none">
        <Path d="M1 1V33H65V1H49V9H17V1H1Z" fill={fill} stroke="black" />
      </Svg>
    </SvgContainer>
  );
};

export default BottomBase;
