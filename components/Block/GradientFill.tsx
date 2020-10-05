import chroma from "chroma-js";
import React from "react";
import { Defs, RadialGradient, Stop } from "react-native-svg";

export const GradientFill = (fill: string) => {
  const h = chroma(fill).get('hsl.h');
  const s = chroma(fill).get('hsl.s');
  const l = chroma(fill).get('hsl.l');
  return (
    <Defs>
      <RadialGradient id="grad" cx="0" cy="0" rx={1} ry={1} fx={0} fy={0}>
        <Stop offset="0" stopColor={chroma(fill).set('hsl.l', l + 0.2).hex()} stopOpacity="1" />
        <Stop offset="0.5" stopColor={fill} stopOpacity="1" />
        <Stop offset="1" stopColor={chroma(fill).set('hsl.l', l - 0.15).hex()} stopOpacity="1" />
      </RadialGradient>
    </Defs>
  )
}