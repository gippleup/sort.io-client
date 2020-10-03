import React from 'react';
import {View, Text} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {BasicBlockProps, BlockTypes} from '../Types';
import colors from '../CommonColorTheme';
import SvgContainer from '../SvgContainer';

const TopBase: React.FC<BasicBlockProps> = (props) => {
  const fill = colors[props.type].top;
  const { scale = 1 } = props;

  return (
    <SvgContainer
      height={8}
      innerMarginTop={0}
      marginLeft={0}
      marginTop={2}
      scale={scale}>
      <Svg
        width={66 * scale}
        height={29 * scale}
        viewBox="0 0 66 29"
        fill="none">
        <Path d="M5 1C2.79086 1 1 2.79086 1 5V24.0557C1 28.2766 6.69006 29.6199 8.57771 25.8446L9.42229 24.1554C11.3099 20.3801 26.2481 16.6779 30.4616 16.9277C31.2595 16.975 32.1047 17 33 17C33.8953 17 34.7405 16.975 35.5384 16.9277C39.7519 16.6779 54.6901 20.3801 56.5777 24.1554L57.4223 25.8446C59.3099 29.6199 65 28.2766 65 24.0557V5C65 2.79086 63.2091 1 61 1H5Z" fill={fill} stroke="black" />
      </Svg>
    </SvgContainer>
  );
};

export default TopBase;
