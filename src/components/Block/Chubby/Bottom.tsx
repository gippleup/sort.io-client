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
        height={32 * scale}
        viewBox="0 0 66 32"
        fill="none">
        {GradientFill(fill)}
        <Path
          d="M13 7C6.37258 7 1 12.3726 1 19V19C1 25.6274 6.37258 31 13 31H53C59.6274 31 65 25.6274 65 19V19C65 12.3726 59.6274 7 53 7H52.0557C50.0462 7 48.0643 6.53213 46.2669 5.63344L41.9443 3.47214C36.3137 0.656861 29.6863 0.65686 24.0557 3.47213L19.7331 5.63344C17.9357 6.53213 15.9538 7 13.9443 7H13Z"
          fill="url(#grad)"
          stroke="black"
        />
      </Svg>
    </SvgContainer>
  );
};

export default BottomBase;
