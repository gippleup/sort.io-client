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
        <Path d="M9 9C4.58172 9 1 12.5817 1 17V21C1 27.6274 6.37258 33 13 33H53C59.6274 33 65 27.6274 65 21V17C65 12.5817 61.4183 9 57 9H53C50.7909 9 49 7.20914 49 5V5C49 2.79086 47.2091 1 45 1H21C18.7909 1 17 2.79086 17 5V5C17 7.20914 15.2091 9 13 9H9Z" fill={fill} stroke="black" />
      </Svg>
    </SvgContainer>
  );
};

export default BottomBase;
