import chroma from 'chroma-js';
import { extractRandomFromArray } from '../utils';
import colorArr from '../Colors';

type ColorTheme = {
  eyeCapGrad1: string;
  eyeCapGrad2: string;
  eyeCapGrad3: string;
  cap: string;
  face: string;
  cloth: string;
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
    eyeCapGrad1: chroma(color)
      .set('hsl.l', l + 0.05)
      .hex(),
    eyeCapGrad2: chroma(color)
      .set('hsl.l', l + 0.1)
      .hex(),
    eyeCapGrad3: chroma(color)
      .set('hsl.l', l + 0.2)
      .hex(),
    cap: chroma(color)
      .set('hsl.h', h + 15)
      .hex(),
    face: chroma(color)
      .set('hsl.l', l + 0.1)
      .hex(),
    cloth: chroma(color)
      .set('hsl.h', h + 30)
      .hex(),
  };
  return acc;
}, {})

colorTheme[50] = {
  eyeCapGrad1: chroma('grey')
    .set('hsl.l', 0.5)
    .hex(),
  eyeCapGrad2: chroma('grey')
    .set('hsl.l', 0.6)
    .hex(),
  eyeCapGrad3: chroma('grey')
    .set('hsl.l', 0.7)
    .hex(),
  cap: chroma('grey')
    .set('hsl.l', 0.3)
    .hex(),
  face: chroma('grey')
    .hex(),
  cloth: chroma('grey')
    .set('hsl.l', 0.6)
    .hex(),
};


export default colorTheme;
