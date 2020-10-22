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
        height={16 * scale}
        viewBox="0 0 66 16"
        fill="none">
        {GradientFill(fill)}
        <Path
          d="M5 1C2.79086 1 1 2.79086 1 5V5C1 7.20914 2.79086 9 5 9H13.9443C15.9538 9 17.9357 9.46787 19.7331 10.3666L24.0557 12.5279C29.6863 15.3431 36.3137 15.3431 41.9443 12.5279L46.2669 10.3666C48.0643 9.46787 50.0462 9 52.0557 9H61C63.2091 9 65 7.20914 65 5V5C65 2.79086 63.2091 1 61 1H5Z"
          fill="url(#grad)"
          stroke="black"
        />
      </Svg>
    </SvgContainer>
  );
};

export default TopBase;
