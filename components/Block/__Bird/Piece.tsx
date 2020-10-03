import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';
import colorTheme from './_ColorTheme';
import {BasicBlockProps} from '../Types';
import SvgContainer from '../SvgContainer';

const MaguniPiece: React.FC<BasicBlockProps> = (props) => {
  const {face, beakBottom, beakTop, fur} = colorTheme[props.type];
  const { scale = 1 } = props;

  return (
    <SvgContainer
      innerMarginTop={0}
      height={24}
      marginLeft={-3}
      scale={scale}>
      <Svg width={72 * scale} height={43 * scale} viewBox="0 0 72 43" fill="none">
        <Path d="M4 0.999939H20V8.99994H52V0.999939H68V24.9999H52V32.9999H20V24.9999H4V0.999939Z" fill={face} stroke="black" />
        <Rect x="10" y="10.9999" width="8" height="8" rx="4" fill="white" stroke="black" />
        <Rect x="12" y="12.9999" width="4" height="4" rx="2" fill="black" />
        <Rect x="14" y="12.9999" width="2" height="2" rx="1" fill="white" />
        <Rect width="8" height="8" rx="4" transform="matrix(-1 0 0 1 62.1769 10.9999)" fill="white" stroke="black" />
        <Rect width="4" height="4" rx="2" transform="matrix(-1 0 0 1 60.1769 12.9999)" fill="black" />
        <Rect width="2" height="2" rx="1" transform="matrix(-1 0 0 1 60 12.9999)" fill="white" />
        <Path d="M4.2434 33.9999C2.23844 28.6538 -0.100681 26.5154 1.57012 22.5948C3.24092 18.6742 7.39935 19.4265 7.91916 23.3075C8.58748 28.2974 4.91172 27.5846 4.2434 33.9999Z" fill={fur} stroke="black" strokeLinejoin="round" />
        <Path d="M9.70674 37.9999C7.41536 31.8901 4.74208 29.4462 6.65157 24.9655C8.56106 20.4848 13.3135 21.3446 13.9076 25.7801C14.6714 31.4827 10.4705 30.6681 9.70674 37.9999Z" fill={fur} stroke="black" strokeLinejoin="round" />
        <Path d="M15.7067 38.9999C13.4154 32.8901 10.7421 30.4462 12.6516 25.9655C14.5611 21.4848 19.3135 22.3446 19.9076 26.7801C20.6714 32.4827 16.4705 31.6681 15.7067 38.9999Z" fill={fur} stroke="black" strokeLinejoin="round" />
        <Path d="M21.7067 39.9999C19.4154 33.8901 16.7421 31.4462 18.6516 26.9655C20.5611 22.4848 25.3135 23.3446 25.9076 27.7801C26.6714 33.4827 22.4705 32.6681 21.7067 39.9999Z" fill={fur} stroke="black" strokeLinejoin="round" />
        <Path d="M27.7067 39.9999C25.4154 34.2719 22.7421 31.9808 24.6516 27.7802C26.5611 23.5795 31.3135 24.3855 31.9076 28.5438C32.6714 33.89 28.4705 33.1263 27.7067 39.9999Z" fill={fur} stroke="black" strokeLinejoin="round" />
        <Path d="M34.7067 41.9999C32.4154 35.8901 29.7421 33.4462 31.6516 28.9655C33.5611 24.4848 38.3135 25.3446 38.9076 29.7801C39.6714 35.4827 35.4705 34.6681 34.7067 41.9999Z" fill={fur} stroke="black" strokeLinejoin="round" />
        <Path d="M68.2199 33.9999C69.9385 29.4175 71.9434 27.5847 70.5113 24.2241C69.0792 20.8636 65.5148 21.5084 65.0693 24.835C64.4964 29.112 67.6471 28.501 68.2199 33.9999Z" fill={fur} stroke="black" strokeLinejoin="round" />
        <Path d="M62.7566 37.9999C64.7616 32.2719 67.1007 29.9808 65.4299 25.7802C63.7591 21.5795 59.6007 22.3855 59.0808 26.5438C58.4125 31.89 62.0883 31.1263 62.7566 37.9999Z" fill={fur} stroke="black" strokeLinejoin="round" />
        <Path d="M57.7566 38.9999C59.7616 33.2719 62.1007 30.9808 60.4299 26.7802C58.7591 22.5795 54.6007 23.3855 54.0808 27.5438C53.4125 32.89 57.0883 32.1263 57.7566 38.9999Z" fill={fur} stroke="black" strokeLinejoin="round" />
        <Path d="M52.7566 38.9999C54.7616 33.2719 57.1007 30.9808 55.4299 26.7802C53.7591 22.5795 49.6007 23.3855 49.0808 27.5438C48.4125 32.89 52.0883 32.1263 52.7566 38.9999Z" fill={fur} stroke="black" strokeLinejoin="round" />
        <Path d="M46.7566 40.9999C48.7616 35.2719 51.1007 32.9808 49.4299 28.7802C47.7591 24.5795 43.6007 25.3855 43.0808 29.5438C42.4125 34.89 46.0883 34.1263 46.7566 40.9999Z" fill={fur} stroke="black" strokeLinejoin="round" />
        <Path d="M41.7067 41.9999C39.4154 36.2719 36.7421 33.9808 38.6516 29.7802C40.5611 25.5795 45.3135 26.3855 45.9076 30.5438C46.6714 35.89 42.4705 35.1263 41.7067 41.9999Z" fill={fur} stroke="black" strokeLinejoin="round" />
        <Path d="M38.7048 21.6071C36.7048 17.1071 32.7048 14.1071 29.2048 16.6071C23.7048 26.1071 38.7048 30.1071 40.7048 35.6071C43.7048 30.6071 40.7048 26.1071 38.7048 21.6071Z" fill={beakBottom} stroke="black" />
        <Path d="M37.5 28.2009C39 29.2008 42 34.2009 40.5 36.2009C45 34.7009 47.5 26.5008 47.5 23.7008C47.5 20.7008 47.5 18.201 45.5 15.2009C43.5 12.2008 39.5754 10.369 35 11.2009C29.5 12.2008 27 18.2009 29.5 22.2009C32 26.2009 34.3316 26.0888 37.5 28.2009Z" fill={beakTop} stroke="black" />
        <Path d="M34.5 19.2008C34.5 17.2008 33.2905 15.9102 32.5 16.7008C31.5 17.7008 34 18.2008 34.5 19.2008Z" fill="black" />
      </Svg>

    </SvgContainer>
  );
};

export default MaguniPiece;
