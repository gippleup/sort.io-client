import React from 'react';
import Svg, {Ellipse, Path} from 'react-native-svg';
import {BasicBlockProps} from '../Types';
import colors from '../CommonColorTheme';
import SvgContainer from '../SvgContainer';

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
        <Path
          d="M1 1C1 1 17 9 33 9C49 9 65 1 65 1V25C65 25 49 33 33 33C17 33 1 25 1 25L1 1Z"
          fill={fill}
          stroke="black"
        />
      </Svg>
    </SvgContainer>
  );
};

export default PieceBase;
