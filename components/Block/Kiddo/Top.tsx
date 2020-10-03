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
      scale={scale}>
      <Svg
        width={66 * scale}
        height={18 * scale}
        viewBox="0 0 66 18"
        fill="none">
        <Path d="M5.94427 1C3.21363 1 1 3.21363 1 5.94427V5.94427C1 7.81702 2.05809 9.52904 3.73313 10.3666L12.7771 14.8885C15.5542 16.2771 18.6165 17 21.7214 17H44.2786C47.3835 17 50.4458 16.2771 53.2229 14.8885L62.2669 10.3666C63.9419 9.52904 65 7.81702 65 5.94427V5.94427C65 3.21363 62.7864 1 60.0557 1H5.94427Z" fill={fill} stroke="black" />
      </Svg>
    </SvgContainer>
  );
};

export default TopBase;
