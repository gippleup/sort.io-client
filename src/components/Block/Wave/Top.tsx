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
          d="M5 1C2.79086 1 1 2.79086 1 5V5C1 7.20914 2.79086 9 5 9H9C13.4183 9 17.8361 12.9968 21.7972 14.954C24.1675 16.1251 27.7089 17 33 17C38.2911 17 41.8325 16.1251 44.2028 14.954C48.1639 12.9968 52.5817 9 57 9H61C63.2091 9 65 7.20914 65 5V5C65 2.79086 63.2091 1 61 1H5Z"
          fill="url(#grad)"
          stroke="black"
        />
      </Svg>
    </SvgContainer>
  );
};

export default TopBase;
