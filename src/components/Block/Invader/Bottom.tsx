import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import styled from 'styled-components';
import {BasicBlockProps} from '../Types';
import colors from '../CommonColorTheme';
import SvgContainer from '../SvgContainer';
import { GradientFill } from '../GradientFill';

const BottomBase: React.FC<BasicBlockProps> = (props) => {
  const fill = colors[props.type].bottom;
  const {scale = 1} = props;
  return (
    <SvgContainer
      innerMarginTop={0}
      scale={scale}
      marginLeft={4}
      marginTop={6}
      height={34}>
      <Svg
        width={66 * scale}
        height={29 * scale}
        viewBox="0 0 66 29"
        fill="none">
        {GradientFill(fill)}
        <Path
          d="M13 2.47214C13 0.859897 10.8266 0.346822 10.1056 1.78885L1.42229 19.1554C-0.609465 23.2189 2.3454 28 6.88855 28H51.1115C55.6546 28 58.6095 23.2189 56.5777 19.1554L47.8944 1.78885C47.1734 0.346824 45 0.859896 45 2.47214V2.47214C45 3.31595 44.316 4 43.4721 4H14.5279C13.684 4 13 3.31595 13 2.47214V2.47214Z"
          fill="url(#grad)"
          stroke="black"
        />
      </Svg>
    </SvgContainer>
  );
};

export default BottomBase;
