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
      marginLeft={12}
      height={34}>
      <Svg
        width={66 * scale}
        height={34 * scale}
        viewBox="0 0 66 34"
        fill="none">
        <Path d="M2.76888 12.3467C-3.11661 21.1749 3.21199 33 13.8222 33H28.1778C38.788 33 45.1166 21.1749 39.2311 12.3467L38.0313 10.547C37.3589 9.53828 37 8.35307 37 7.14074V7.14074C37 3.7493 34.2507 1 30.8593 1H11.1407C7.7493 1 5 3.7493 5 7.14073V7.14073C5 8.35307 4.64115 9.53828 3.96867 10.547L2.76888 12.3467Z" fill={fill} stroke="black" />
      </Svg>
    </SvgContainer>
  );
};

export default BottomBase;
