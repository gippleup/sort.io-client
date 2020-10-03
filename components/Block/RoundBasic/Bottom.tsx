import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import styled from 'styled-components';
import {BasicBlockProps} from '../Types';
import colors from '../CommonColorTheme';
import SvgContainer from '../SvgContainer';

const BottomBase: React.FC<BasicBlockProps> = (props) => {
  const fill = colors[props.type].bottom;
  const {scale = 1} = props;
  return (
    <SvgContainer
      innerMarginTop={0}
      scale={scale}
      marginLeft={0}
      height={34}>
      <Svg
        width={66 * scale}
        height={34 * scale}
        viewBox="0 0 66 34"
        fill="none">
        <Path d="M9 1C4.58172 1 1 4.58172 1 9V17C1 25.8366 8.16344 33 17 33H49C57.8366 33 65 25.8366 65 17V9C65 4.58172 61.4183 1 57 1H53C50.7909 1 49 2.79086 49 5V5C49 7.20914 47.2091 9 45 9H21C18.7909 9 17 7.20914 17 5V5C17 2.79086 15.2091 1 13 1H9Z" fill={fill} stroke="black" />
      </Svg>
    </SvgContainer>
  );
};

export default BottomBase;
