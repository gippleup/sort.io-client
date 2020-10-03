import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';
import colorTheme from './_ColorTheme';
import {BasicBlockProps} from '../Types';
import SvgContainer from '../SvgContainer';

const MaguniTop: React.FC<BasicBlockProps> = (props) => {
  const {cap} = colorTheme[props.type];
  const { scale = 1 } = props;

  return (
    <SvgContainer
      innerMarginTop={0}
      height={24}
      marginLeft={0}
      marginTop={-6}
      scale={scale}>
      <Svg width={66 * scale} height={24 * scale} viewBox="0 0 66 24" fill="none">
        <Path d="M1 7.50006C1 11.0001 1 15.5001 1 15.5001H17V23.5001H49V15.5001H65C65 15.5001 65 11.0001 65 7.50006C65 4.00006 61.5 1 33 1C4.5 1 1 4.00001 1 7.50006Z" fill={cap} stroke="black" />
      </Svg>
    </SvgContainer>
  );
};

export default MaguniTop;
