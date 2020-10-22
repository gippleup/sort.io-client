import chroma from 'chroma-js';
import { extractRandomFromArray } from '../utils';
import colorArr from '../Colors';

type ColorTheme = {
  cap: string;
  face: string;
  bottom: string;
};

let index = colorArr.map((_, i) => i);

const colorTheme = colorArr.reduce((
  acc: {[index: number]: ColorTheme},
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
    cap: chroma(color)
      .set('hsl.h', h + 15)
      .hex(),
    face: chroma(color)
      .set('hsl.l', l + 0.1)
      .hex(),
    bottom: chroma(color)
      .set('hsl.h', h + 30)
      .hex(),
  };
  return acc;
}, {})

colorTheme[50] = {
  cap: chroma('grey')
    .set('hsl.l', 0.3)
    .hex(),
  face: chroma('grey')
    .hex(),
  bottom: chroma('grey')
    .set('hsl.l', 0.6)
    .hex(),
};


export default colorTheme;
