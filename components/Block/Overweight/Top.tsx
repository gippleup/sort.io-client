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
      scale={scale}>
      <Svg
        width={66 * scale}
        height={14 * scale}
        viewBox="0 0 66 14"
        fill="none">
        <Path d="M7.11146 1C3.73619 1 1 3.73619 1 7.11146V7.11146C1 11.6546 5.78107 14.6095 9.84458 12.5777L14.9628 10.0186C16.3025 9.34873 17.7798 9 19.2776 9H46.7224C48.2202 9 49.6975 9.34873 51.0372 10.0186L56.1554 12.5777C60.2189 14.6095 65 11.6546 65 7.11146V7.11146C65 3.73619 62.2638 1 58.8885 1H7.11146Z" fill={fill} stroke="black" />
      </Svg>
    </SvgContainer>
  );
};

export default TopBase;
