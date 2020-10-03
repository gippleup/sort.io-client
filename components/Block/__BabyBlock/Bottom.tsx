import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';
import {BasicBlockProps} from '../Types';
import colorTheme from './_ColorTheme';
import SvgContainer from '../SvgContainer';

const BabyBlockBottom: React.FC<BasicBlockProps> = (props) => {
  const {bottom} = colorTheme[props.type];
  const { scale = 1 } = props;

  return (
    <SvgContainer
      height={24}
      marginLeft={0}
      innerMarginTop={0}
      marginTop={6}
      scale={scale}>
      <Svg width={66 * scale} height={28 * scale} viewBox="0 0 66 28" fill="none">
        <Path d="M14.9628 1.98142C8.54782 -1.22609 1 3.43872 1 10.6109V14.7771C1 21.5276 6.47238 27 13.2229 27H52.7771C59.5276 27 65 21.5276 65 14.7771V10.6109C65 3.43872 57.4522 -1.22609 51.0372 1.98142V1.98142C49.6975 2.65127 48.2202 3 46.7224 3H19.2776C17.7798 3 16.3025 2.65127 14.9628 1.98142V1.98142Z" fill={bottom} stroke="black" />
      </Svg>
    </SvgContainer>
  );
};

export default BabyBlockBottom;
