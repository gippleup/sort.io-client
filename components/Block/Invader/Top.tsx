import React from 'react';
import {View, Text} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {BasicBlockProps, BlockTypes} from '../Types';
import colors from '../CommonColorTheme';
import SvgContainer from '../SvgContainer';

const TopBase: React.FC<BasicBlockProps> = (props) => {
  const fill = colors[props.type].top;
  const { scale = 1 } = props;

  return (
    <SvgContainer
      height={8}
      innerMarginTop={0}
      marginLeft={0}
      marginTop={2}
      scale={scale}>
      <Svg
        width={66 * scale}
        height={28 * scale}
        viewBox="0 0 66 28"
        fill="none">
        <Path d="M8.63932 1C4.42024 1 1 4.42024 1 8.63932V23.1115C1 27.5676 7.00716 28.9857 9 25L14.1056 14.7889C14.8266 13.3468 17 13.8599 17 15.4721V15.4721C17 16.316 17.684 17 18.5279 17H47.4721C48.316 17 49 16.316 49 15.4721V15.4721C49 13.8599 51.1734 13.3468 51.8944 14.7889L57 25C58.9928 28.9857 65 27.5676 65 23.1115V8.63932C65 4.42024 61.5798 1 57.3607 1H8.63932Z" fill={fill} stroke="black" />
      </Svg>
    </SvgContainer>
  );
};

export default TopBase;
