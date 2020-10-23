import React from 'react'
import { View, Text } from 'react-native'
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
  const lengthMap = rows.map((row) => {
    const characters = row.split("");
    const characterCount = characters.filter((char) => char !== " ").length;
    const spaceCount = characters.filter((char) => char !== " ").length;
    const expectedWidth = characterCount * (size * 72/100) + spaceCount * (size * 28/100);
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
