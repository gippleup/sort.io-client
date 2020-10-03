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
        <Path d="M13.9443 1C6.79535 1 1 6.79535 1 13.9443V17C1 25.8366 8.16344 33 17 33H49C57.8366 33 65 25.8366 65 17V13.9443C65 6.79535 59.2047 1 52.0557 1V1C50.0462 1 48.0643 1.46787 46.2669 2.36656L41.9443 4.52786C36.3137 7.34314 29.6863 7.34314 24.0557 4.52787L19.7331 2.36656C17.9357 1.46787 15.9538 1 13.9443 1V1Z" fill={fill} stroke="black" />
      </Svg>
    </SvgContainer>
  );
};

export default BottomBase;
