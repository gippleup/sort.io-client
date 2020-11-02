import React from 'react'
import { View, Text } from 'react-native'
import useGlobal from '../hooks/useGlobal'
import { SupportedLanguage } from '../redux/actions/global/types'
import { FlexHorizontal } from './Generic/StyledComponents'
import StrokedText from './StrokedText'

type StrokedNotoSansProps = {
  color?: string;
  size?: number;
  strokeColor?: string;
  strokeWidth?: number;
  width?: number;
  height?: number;
  type?: "Black" | "Thin" | "Regular" | "Bold" | "Light" | "Medium";
  text: string;
  test?: boolean;
}

const StrokedNotoSans = (props: StrokedNotoSansProps) => {
  const {text, size = 30} = props;
  const rows = text.split("\n");
  const {language: lan} = useGlobal();
  const lengthMap = rows.map((row) => {
    const charRatio = lan === SupportedLanguage.ko ? 72/100 : 44/100;
    const spaceRatio = lan === SupportedLanguage.ko ? 28/100 : 28/100;
    const characters = row.split("");
    const characterCount = characters.filter((char) => char !== " ").length;
    const spaceCount = characters.filter((char) => char !== " ").length;
    const expectedWidth = characterCount * (size * charRatio) + spaceCount * (size * spaceRatio);
    return expectedWidth;
  });

  const maxWidth = lengthMap.reduce((acc, num) => {
    if (acc >= num) return num;
    return acc;
  });

  const expectedHeight = rows.length * size * 1.5;

  const {
    type = "Black",
    color = "black",
    strokeColor = "red",
    strokeWidth = 2,
    width = maxWidth,
    height = expectedHeight,
    test,
  } = props;

  return (
    <FlexHorizontal>
      <StrokedText
        dyMultiplier={0.37}
        fillColor={color}
        fontFamily={"NotoSansKR-" + type}
        fontSize={size}
        height={height}
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
        text={text}
        width={width}
        test={test}
      />
    </FlexHorizontal>
  )
}

export default StrokedNotoSans
