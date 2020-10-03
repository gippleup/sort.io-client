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
        <Path d="M9 9C4.58172 9 1 12.5817 1 17V21C1 27.6274 6.37258 33 13 33H53C59.6274 33 65 27.6274 65 21V17C65 12.5817 61.4183 9 57 9V9C52.5817 9 48.1639 5.00317 44.2028 3.046C41.8325 1.87488 38.2911 1 33 1C27.7089 1 24.1675 1.87488 21.7972 3.046C17.8361 5.00317 13.4183 9 9 9V9Z" fill={fill} stroke="black" />
      </Svg>
    </SvgContainer>
  );
};

export default BottomBase;
