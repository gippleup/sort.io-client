import React from 'react';
import {View, Text} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {BasicBlockProps, BlockTypes} from '../Types';
import colors from '../CommonColorTheme';
import SvgContainer from '../SvgContainer';
import { GradientFill } from '../GradientFill';

const TopBase: React.FC<BasicBlockProps> = (props) => {
  const fill = colors[props.type].top;
  const { scale = 1 } = props;

  return (
    <SvgContainer
      height={8}
      innerMarginTop={0}
      marginLeft={0}
      scale={scale}>
      <Svg
        width={66 * scale}
        height={18 * scale}
        viewBox="0 0 66 18"
        fill="none">
        {GradientFill(fill)}
        <Path
          d="M1 1V17H17V9H49V17H65V1H1Z"
          fill="url(#grad)"
          stroke="black"
        />
      </Svg>
    </SvgContainer>
  );
};

export default TopBase;