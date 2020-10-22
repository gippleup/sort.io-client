import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import styled from 'styled-components';
import {BasicBlockProps} from '../Types';
import colors from '../CommonColorTheme';
import SvgContainer from '../SvgContainer';

const BottomBase: React.FC<BasicBlockProps> = (props) => {
  const fill = colors[props.type].bottom;
  const {scale = 1} = props;
  return (
    <SvgContainer
      innerMarginTop={0}
      scale={scale}
      marginLeft={0}
      height={34}>
      <Svg width={66 * scale} height={26 * scale} viewBox="0 0 66 26" fill="none">
        <Path d="M1 1V25H65V1H1Z" fill={fill} stroke="black" />
      </Svg>
    </SvgContainer>
  );
};

export default BottomBase;
