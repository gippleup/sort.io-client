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
        <Path d="M5 1C2.79086 1 1 2.79086 1 5V5C1 7.20914 2.79086 9 5 9H13C15.2091 9 17 10.7909 17 13V13C17 15.2091 18.7909 17 21 17H45C47.2091 17 49 15.2091 49 13V13C49 10.7909 50.7909 9 53 9H61C63.2091 9 65 7.20914 65 5V5C65 2.79086 63.2091 1 61 1H5Z" fill={fill} stroke="black" />
      </Svg>
    </SvgContainer>
  );
};

export default TopBase;
