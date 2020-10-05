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
          d="M9 1C4.58172 1 1 4.58172 1 9V9C1 13.4183 4.58172 17 9 17H13C15.2091 17 17 15.2091 17 13V13C17 10.7909 18.7909 9 21 9H45C47.2091 9 49 10.7909 49 13V13C49 15.2091 50.7909 17 53 17H57C61.4183 17 65 13.4183 65 9V9C65 4.58172 61.4183 1 57 1H9Z"
          fill="url(#grad)"
          stroke="black"
        />
      </Svg>
    </SvgContainer>
  );
};

export default TopBase;
