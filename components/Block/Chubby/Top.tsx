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
        <Path d="M9 1C4.58172 1 1 4.58172 1 9V9C1 13.4183 4.58172 17 9 17H13.9443C15.9538 17 17.9357 16.5321 19.7331 15.6334L24.0557 13.4721C29.6863 10.6569 36.3137 10.6569 41.9443 13.4721L46.2669 15.6334C48.0643 16.5321 50.0462 17 52.0557 17H57C61.4183 17 65 13.4183 65 9V9C65 4.58172 61.4183 1 57 1H9Z" fill={fill} stroke="black" />
      </Svg>
    </SvgContainer>
  );
};

export default TopBase;
