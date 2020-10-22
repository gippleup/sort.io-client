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
      marginTop={0}
      scale={scale}>
      <Svg
        width={66 * scale}
        height={18 * scale}
        viewBox="0 0 66 18"
        fill="none">
        {GradientFill(fill)}
        <Path
          d="M5.94427 1C3.21363 1 1 3.21363 1 5.94427V5.94427C1 7.81702 2.05877 9.52599 3.78039 10.263C9.0462 12.5173 21.0231 17 33 17C44.9769 17 56.9538 12.5173 62.2196 10.263C63.9412 9.52599 65 7.81702 65 5.94427V5.94427C65 3.21363 62.7864 1 60.0557 1H5.94427Z"
          fill="url(#grad)"
          stroke="black" />
      </Svg>
    </SvgContainer>
  );
};

export default TopBase;
