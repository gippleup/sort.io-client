import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';
import {BasicBlockProps} from '../Types';
import colorTheme from './_ColorTheme';
import SvgContainer from '../SvgContainer';

const MaguniBottom: React.FC<BasicBlockProps> = (props) => {
  const {cloth} = colorTheme[props.type];
  const { scale = 1 } = props;

  return (
    <SvgContainer
      height={24}
      marginLeft={0}
      innerMarginTop={0}
      scale={scale}>
      <Svg width={66 * scale} height={34 * scale} viewBox="0 0 66 34" fill="none">
        <Path d="M1 1V33H65V1H49V9H17V1H1Z" fill={cloth} stroke="black" />
        <Path d="M48.5 1H65V33H28V15.5L35.5 9H48.5V1Z" fill={cloth} stroke="black" />
        <Path d="M51.5 4H65V1H48.5V9H35.5L28 15.5V19L36.5 11.5H51.5V4Z" fill="white" stroke="black" />
        <Path d="M17 1H1V33H41V16L35.5 9H17V1Z" fill={cloth} stroke="black" />
        <Path d="M14.5 3.5H1V1H17V9H35.5L41 16V19L34.5 11.5H14.5V3.5Z" fill="white" stroke="black" />
      </Svg>

    </SvgContainer>
  );
};

export default MaguniBottom;
