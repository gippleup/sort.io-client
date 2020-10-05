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
          d="M1 17C1 12.5817 4.58172 9 9 9V9C13.4183 9 17.8361 5.00317 21.7972 3.04601C24.1675 1.87488 27.7089 1 33 1C38.2911 1 41.8325 1.87488 44.2028 3.046C48.1639 5.00317 52.5817 9 57 9V9C61.4183 9 65 12.5817 65 17V25C65 29.4183 61.4183 33 57 33V33C52.5817 33 48.1639 29.0032 44.2028 27.046C41.8325 25.8749 38.2911 25 33 25C27.7089 25 24.1675 25.8749 21.7972 27.046C17.8361 29.0032 13.4183 33 9 33V33C4.58172 33 1 29.4183 1 25V17Z"
          fill="url(#grad)"
          stroke="black"
        />
      </Svg>
    </SvgContainer>
  );
};

export default PieceBase;
