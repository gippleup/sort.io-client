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
          d="M1 17C1 12.5817 4.58172 9 9 9H13C15.2091 9 17 7.20914 17 5V5C17 2.79086 18.7909 1 21 1H45C47.2091 1 49 2.79086 49 5V5C49 7.20914 50.7909 9 53 9H57C61.4183 9 65 12.5817 65 17V25C65 29.4183 61.4183 33 57 33H53C50.7909 33 49 31.2091 49 29V29C49 26.7909 47.2091 25 45 25H21C18.7909 25 17 26.7909 17 29V29C17 31.2091 15.2091 33 13 33H9C4.58172 33 1 29.4183 1 25V17Z"
          fill="url(#grad)"
          stroke="black"
        />
      </Svg>
    </SvgContainer>
  );
};

export default PieceBase;
