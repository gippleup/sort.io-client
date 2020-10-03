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
          d="M1 9C1 4.58172 4.58172 1 9 1V1C13.4183 1 17.8361 4.99683 21.7972 6.95399C24.1675 8.12512 27.7089 9 33 9C38.2911 9 41.8325 8.12512 44.2028 6.954C48.1639 4.99683 52.5817 1 57 1V1C61.4183 1 65 4.58172 65 9V17C65 21.4183 61.4183 25 57 25V25C52.5817 25 48.1639 28.9968 44.2028 30.954C41.8325 32.1251 38.2911 33 33 33C27.7089 33 24.1675 32.1251 21.7972 30.954C17.8361 28.9968 13.4183 25 9 25V25C4.58172 25 1 21.4183 1 17V9Z"
          fill={fill}
          stroke="black"
        />
      </Svg>
    </SvgContainer>
  );
};

export default PieceBase;
