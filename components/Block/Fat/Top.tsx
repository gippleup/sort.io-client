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
          d="M9 1C4.58172 1 1 4.58172 1 9V9C1 13.4183 4.58172 17 9 17V17C13.4183 17 17.8361 13.0032 21.7972 11.046C24.1675 9.87488 27.7089 9 33 9C38.2911 9 41.8325 9.87488 44.2028 11.046C48.1639 13.0032 52.5817 17 57 17V17C61.4183 17 65 13.4183 65 9V9C65 4.58172 61.4183 1 57 1H9Z"
          fill="url(#grad)"
          stroke="black"
        />
      </Svg>
    </SvgContainer>
  );
};

export default TopBase;
