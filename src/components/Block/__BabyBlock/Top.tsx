import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';
import colorTheme from './_ColorTheme';
import {BasicBlockProps} from '../Types';
import SvgContainer from '../SvgContainer';

const BabyBlockTop: React.FC<BasicBlockProps> = (props) => {
  const {cap} = colorTheme[props.type];
  const { scale = 1 } = props;

  return (
    <SvgContainer
      innerMarginTop={0}
      height={24}
      marginLeft={0}
      marginTop={0}
      scale={scale}>
      <Svg width={66 * scale} height={18 * scale} viewBox="0 0 66 18" fill="none">
        <Path d="M65 14.1684L65 12.0557C65 10.183 63.9419 8.47094 62.2669 7.63342L53.2229 3.11144C50.4458 1.72289 47.3835 0.999988 44.2786 0.999988L21.7214 0.99999C18.6165 0.999991 15.5542 1.72289 12.7771 3.11145L3.73313 7.63343C2.05809 8.47095 0.999999 10.183 1 12.0557L1 14.5402C1 15.8987 2.10127 17 3.45975 17C3.81567 17 4.16736 16.9227 4.49052 16.7736L6.09585 16.0327C8.89031 14.7429 12.1097 14.7429 14.9042 16.0327C16.2849 16.67 17.7876 17 19.3083 17L46.1636 17C47.7051 17 49.2306 16.6869 50.6475 16.0796L51.4139 15.7512C54.0054 14.6405 56.9544 14.7272 59.4762 15.9881L60.9021 16.7011C61.2953 16.8976 61.7289 17 62.1684 17C63.7323 17 65 15.7323 65 14.1684Z" fill={cap} stroke="black" />
      </Svg>
    </SvgContainer>
  );
};

export default BabyBlockTop;
