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
      marginTop={6}
      height={34}>
      <Svg
        width={66 * scale}
        height={28 * scale}
        viewBox="0 0 66 28"
        fill="none">
        <Path d="M19.6643 1.41519C10.7942 -0.555275 1 5.69079 1 14.7771V14.7771C1 21.5276 6.47238 27 13.2229 27H52.7771C59.5276 27 65 21.5276 65 14.7771V14.7771C65 5.6908 55.2058 -0.555276 46.3357 1.41519C42.1389 2.3475 37.5695 3 33 3C28.4305 3 23.8611 2.3475 19.6643 1.41519Z" fill={fill} stroke="black" />
      </Svg>
    </SvgContainer>
  );
};

export default BottomBase;
