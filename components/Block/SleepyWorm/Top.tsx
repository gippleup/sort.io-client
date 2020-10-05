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
        height={15 * scale}
        viewBox="0 0 66 15"
        fill="none">
        {GradientFill(fill)}
        <Path
          d="M7.11146 1C3.73619 1 1 3.73619 1 7.11146V7.11146C1 11.6546 5.85789 14.7633 10.1542 13.2863C16.2359 11.1956 24.6179 9 33 9C41.3821 9 49.7641 11.1956 55.8458 13.2863C60.1421 14.7633 65 11.6546 65 7.11146V7.11146C65 3.73619 62.2638 1 58.8885 1H7.11146Z"
          fill="url(#grad)"
          stroke="black"
        />
      </Svg>
    </SvgContainer>
  );
};

export default TopBase;
