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
        height={43 * scale}
        viewBox="0 0 66 43"
        fill="none">
        {GradientFill(fill)}
        <Path
          d="M1 35.0154C1 33.7013 1.38899 32.4165 2.11794 31.3231L15.9687 10.547C16.6411 9.53828 17 8.35307 17 7.14074V7.14074C17 3.7493 19.7493 1 23.1407 1H42.8593C46.2507 1 49 3.7493 49 7.14073V7.14073C49 8.35307 49.3589 9.53828 50.0313 10.547L63.8821 31.3231C64.611 32.4165 65 33.7013 65 35.0154V35.0154C65 41.6013 56.4583 44.1875 52.8051 38.7077L50.0313 34.547C49.3589 33.5383 49 32.3531 49 31.1407V31.1407C49 27.7493 46.2507 25 42.8593 25H23.1407C19.7493 25 17 27.7493 17 31.1407V31.1407C17 32.3531 16.6411 33.5383 15.9687 34.547L13.1949 38.7077C9.54166 44.1875 1 41.6013 1 35.0154V35.0154Z"
          fill="url(#grad)"
          stroke="black"
        />
      </Svg>
    </SvgContainer>
  );
};

export default PieceBase;
