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
          d="M9 1C4.58172 1 1 4.58172 1 9V17C1 25.8366 8.16344 33 17 33H49C57.8366 33 65 25.8366 65 17V9C65 4.58172 61.4183 1 57 1V1C52.5817 1 48.1639 4.99683 44.2028 6.95399C41.8325 8.12512 38.2911 9 33 9C27.7089 9 24.1675 8.12512 21.7972 6.954C17.8361 4.99683 13.4183 1 9 1V1Z"
          fill="url(#grad)"
          stroke="black"
        />
      </Svg>
    </SvgContainer>
  );
};

export default BottomBase;
