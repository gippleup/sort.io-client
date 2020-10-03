import chroma from 'chroma-js';
import { extractRandomFromArray } from '../utils';
import colorArr from '../Colors';

type Part = "hair" | "face" | "fur" | "feet" | "beakTop" | "beakBottom" | "bottom";

type ColorTheme = {
  [T in Part]: string;
};

let index = colorArr.map((_, i) => i);

const colorTheme = colorArr.reduce((
  acc: { [index: number]: ColorTheme },
  color: string,
  i: number
) => {
  const chromaColor = chroma(color)
  const h = chromaColor.get('hsl.h');
  const s = chromaColor.get('hsl.s');
  const l = chromaColor.get('hsl.l');
  const randomIndex = extractRandomFromArray(index);
  index = randomIndex.extractedArray;
  acc[randomIndex.pickedEle] = {
    face: chroma(color)
      .set('hsl.l', l + 0.05)
      .hex(),
    feet: chroma(color)
      .set('hsl.l', l + 0.2)
      .hex(),
    fur: chroma(color)
      .set('hsl.l', l < 0.6 ? l + 0.3 : l)
      .hex(),
    hair: chroma(color)
      .set('hsl.h', h + 15)
      .hex(),
    beakTop: chroma(color)
      .set('hsl.h', h + 15)
      .hex(),
    beakBottom: chroma(color)
      .set('hsl.h', h + 15)
      .set('hsl.l', l - 0.1)
      .hex(),
    bottom: chroma(color)
      .set('hsl.h', h + 15)
      .hex(),
  };
  return acc;
}, {})

colorTheme[50] = {
  feet: chroma('grey')
    .set('hsl.l', 0.5)
    .hex(),
  fur: chroma('grey')
    .set('hsl.l', 0.6)
    .hex(),
  hair: chroma('grey')
    .set('hsl.l', 0.7)
    .hex(),
  face: chroma('grey')
    .hex(),
  beakTop: chroma('grey')
    .hex(),
  beakBottom: chroma('grey')
    .hex(),
  bottom: chroma('grey')
    .hex(),
};


export default colorTheme;
