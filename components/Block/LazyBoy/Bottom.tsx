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
      marginLeft={2}
      marginTop={8}
      height={34}>
      <Svg
        width={66 * scale}
        height={26 * scale}
        viewBox="0 0 66 26"
        fill="none">
        <Path d="M1.89443 19.2111C0.564625 21.8707 2.49861 25 5.47214 25H56.5279C59.5014 25 61.4354 21.8708 60.1056 19.2111L54.5777 8.15542C52.6901 4.38013 37.7519 0.677916 33.5384 0.927659C32.7405 0.974952 31.8953 1 31 1C30.1047 1 29.2595 0.974952 28.4616 0.927659C24.2481 0.677916 9.30994 4.38013 7.42229 8.15541L1.89443 19.2111Z" fill={fill} stroke="black" />
      </Svg>
    </SvgContainer>
  );
};

export default BottomBase;
