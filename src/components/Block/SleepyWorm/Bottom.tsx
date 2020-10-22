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
      marginLeft={0}
      height={34}>
      <Svg
        width={66 * scale}
        height={34 * scale}
        viewBox="0 0 66 34"
        fill="none">
        {GradientFill(fill)}
        <Path
          d="M9.47129 5.52401C4.17216 7.39057 1 12.5489 1 18.1672V18.1672C1 26.3591 7.64088 33 15.8328 33H50.1672C58.3591 33 65 26.3591 65 18.1672V18.1672C65 12.5489 61.8278 7.39057 56.5287 5.52401C50.4009 3.36557 41.7005 1 33 1C24.2995 1 15.5991 3.36557 9.47129 5.52401Z"
          fill="url(#grad)"
          stroke="black"
        />
      </Svg>
    </SvgContainer>
  );
};

export default BottomBase;
