import React from 'react';
import Svg, {Ellipse, Path} from 'react-native-svg';
import {BasicBlockProps} from '../Types';
import colors from '../CommonColorTheme';
import SvgContainer from '../SvgContainer';
import { GradientFill } from '../GradientFill';

const PieceBase: React.FC<BasicBlockProps> = (props) => {
  const fill = colors[props.type].piece;
  const { scale = 1 } = props;
  return (
    <SvgContainer
      height={24}
      scale={scale}
      marginLeft={0}
      innerMarginTop={0}>
      <Svg
        width={66 * scale}
        height={34 * scale}
        viewBox="0 0 66 34"
        fill="none">
        {GradientFill(fill)}
        <Path
          d="M1 9C1 4.58172 4.58172 1 9 1H13C15.2091 1 17 2.79086 17 5V5C17 7.20914 18.7909 9 21 9H45C47.2091 9 49 7.20914 49 5V5C49 2.79086 50.7909 1 53 1H57C61.4183 1 65 4.58172 65 9V17C65 21.4183 61.4183 25 57 25H53C50.7909 25 49 26.7909 49 29V29C49 31.2091 47.2091 33 45 33H21C18.7909 33 17 31.2091 17 29V29C17 26.7909 15.2091 25 13 25H9C4.58172 25 1 21.4183 1 17V9Z"
          fill="url(#grad)"
          stroke="black"
        />
      </Svg>
    </SvgContainer>
  );
};

export default PieceBase;
