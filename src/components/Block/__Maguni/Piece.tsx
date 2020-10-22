import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';
import colorTheme from './_ColorTheme';
import {BasicBlockProps} from '../Types';
import SvgContainer from '../SvgContainer';

const MaguniPiece: React.FC<BasicBlockProps> = (props) => {
  const {eyeCapGrad1, eyeCapGrad2, eyeCapGrad3, face} = colorTheme[props.type];
  const { scale = 1 } = props;

  return (
    <SvgContainer
      innerMarginTop={0}
      height={24}
      marginLeft={0}
      scale={scale}>
      <Svg width={66 * scale} height={34 * scale} viewBox="0 0 66 34" fill="none">
        <Path d="M1 1H17V9H49V1H65V25H49V33H17V25H1V1Z" fill={face} stroke="black" />
        <Path d="M58.5 11.4414V15.5H51.5V10.5664L58.5 11.4414Z" fill="white" stroke="black" />
        <Path d="M53 11L57 11.5V14H53V11Z" fill="black" />
        <Path d="M17 3C17 3 16.5 5 15 7C13.5 9 7.5 14 5 16.5C2.5 19 1 19 1 19" stroke="black" />
        <Rect x="3" y="6.5" width="12" height="11.25" rx="4" fill={eyeCapGrad1} stroke="black" />
        <Rect x="4.5" y="8" width="9" height="8.25" rx="3" fill={eyeCapGrad2} />
        <Rect x="6" y="8.75" width="6.75" height="6" rx="3" fill={eyeCapGrad3} />
        <Path d="M38.3846 21.5L37.7692 19H28.2307L27.6154 21.5" stroke="black" strokeLinecap="round" />
        <Path d="M37.4615 21.5H39" stroke="black" strokeLinecap="round" />
        <Path d="M27 21.5H28.5385" stroke="black" strokeLinecap="round" />
      </Svg>
    </SvgContainer>
  );
};

export default MaguniPiece;
