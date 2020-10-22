import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';
import colorTheme from './_ColorTheme';
import {BasicBlockProps} from '../Types';
import SvgContainer from '../SvgContainer';

const BabyBlockPiece: React.FC<BasicBlockProps> = (props) => {
  const {face} = colorTheme[props.type];
  const { scale = 1 } = props;

  return (
    <SvgContainer
      innerMarginTop={0}
      height={24}
      marginTop={1}
      marginLeft={0}
      scale={scale}>
      <Svg width={66 * scale} height={33 * scale} viewBox="0 0 66 33" fill="none">
        <Path d="M1 15.6109C1 8.43872 8.54782 3.77391 14.9628 6.98142V6.98142C16.3025 7.65127 17.7798 8 19.2776 8H46.7224C48.2202 8 49.6975 7.65127 51.0372 6.98142V6.98142C57.4522 3.77391 65 8.43872 65 15.6109V17.3666C65 21.432 62.7031 25.1485 59.0669 26.9666L53.2229 29.8885C50.4458 31.2771 47.3835 32 44.2786 32H21.7214C18.6165 32 15.5542 31.2771 12.7771 29.8885L6.93313 26.9666C3.29691 25.1485 1 21.432 1 17.3666V15.6109Z" fill={face} stroke="black" />
        {/* <Rect x="9" y="15" width="7" height="7" rx="3.5" fill="black" />
        <Rect x="10.75" y="16.75" width="1.16667" height="1.16667" rx="0.583333" fill="white" />
        <Rect x="11.9167" y="17.9167" width="2.33333" height="2.33333" rx="1.16667" fill="white" />
        <Rect x="50" y="15" width="7" height="7" rx="3.5" fill="black" />
        <Rect x="51.75" y="16.75" width="1.16667" height="1.16667" rx="0.583333" fill="white" />
        <Rect x="52.9166" y="17.9167" width="2.33333" height="2.33333" rx="1.16667" fill="white" />
        <Rect x="27.5" y="16.5" width="11" height="5" rx="2.5" fill="black" stroke="black" />
        <Rect x="30.75" y="16.75" width="2.25" height="1.5" rx="0.75" fill="white" />
        <Rect x="30" y="19.75" width="6" height="1.5" rx="0.75" fill="#FF6C6C" /> */}
      </Svg>
    </SvgContainer>
  );
};

export default BabyBlockPiece;
