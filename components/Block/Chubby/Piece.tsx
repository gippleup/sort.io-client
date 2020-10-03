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
        height={32 * scale}
        viewBox="0 0 66 32"
        fill="none">
        <Path
          d="M1 19C1 12.3726 6.37258 7 13 7H13.9443C15.9538 7 17.9357 6.53213 19.7331 5.63344L24.0557 3.47214C29.6863 0.656861 36.3137 0.65686 41.9443 3.47213L46.2669 5.63344C48.0643 6.53213 50.0462 7 52.0557 7H53C59.6274 7 65 12.3726 65 19V19C65 25.6274 59.6274 31 53 31H52.0557C50.0462 31 48.0643 30.5321 46.2669 29.6334L41.9443 27.4721C36.3137 24.6569 29.6863 24.6569 24.0557 27.4721L19.7331 29.6334C17.9357 30.5321 15.9538 31 13.9443 31H13C6.37258 31 1 25.6274 1 19V19Z"
          fill={fill}
          stroke="black"
        />
      </Svg>
    </SvgContainer>
  );
};

export default PieceBase;
