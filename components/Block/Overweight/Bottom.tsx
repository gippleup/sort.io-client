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
      <Svg
        width={66 * scale}
        height={34 * scale}
        viewBox="0 0 66 34"
        fill="none">
        <Path d="M9.19938 4.90031C4.17426 7.41287 1 12.5489 1 18.1672V18.1672C1 26.3591 7.64088 33 15.8328 33H50.1672C58.3591 33 65 26.3591 65 18.1672V18.1672C65 12.5489 61.8257 7.41287 56.8006 4.90031L53.2229 3.11146C50.4458 1.7229 47.3835 1 44.2786 1H21.7214C18.6165 1 15.5542 1.7229 12.7771 3.11146L9.19938 4.90031Z" fill={fill} stroke="black" />
      </Svg>
    </SvgContainer>
  );
};

export default BottomBase;
