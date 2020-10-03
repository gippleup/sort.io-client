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
        height={58 * scale}
        viewBox="0 0 66 58"
        fill="none">
        <Path
          d="M1 33L17 1C17 1 17 9 33 9C49 9 49 1 49 1L65 33V57L49 25C49 25 49 33 33 33C17 33 17 25 17 25L1 57V33Z"
          fill={fill}
          stroke="black"
        />
      </Svg>
    </SvgContainer>
  );
};

export default PieceBase;
