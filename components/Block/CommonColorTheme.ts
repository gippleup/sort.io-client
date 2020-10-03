import chroma from 'chroma-js';
import { extractRandomFromArray } from './utils';
import colorArr from './Colors';

type ColorTheme = {
  top: string;
  piece: string;
  bottom: string;
};

let index = colorArr.map((_, i) => i);

const colorTheme = colorArr.reduce((
  acc: { [index: number]: ColorTheme },
  color: string,
  i: number
) => {
  const chromaColor = chroma(color);
  const h = chromaColor.get('hsl.h');
  const s = chromaColor.get('hsl.s');
  const l = chromaColor.get('hsl.l');
  const randomIndex = extractRandomFromArray(index);
  index = randomIndex.extractedArray;
  acc[i] = {
    top: chroma(color)
      .set('hsl.l', l - 0.1)
      .hex(),
    piece: chroma(color)
      // .set('hsl.l', l + 0.2)
      .hex(),
    bottom: chroma(color)
      .set('hsl.l', Math.max(l - 0.3, 0.3))
      .hex(),
  };
  return acc;
}, {})

colorTheme[50] = {
  top: 'grey',
  piece: 'darkgrey',
  bottom: 'grey',
};


export default colorTheme;
