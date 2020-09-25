import chroma from 'chroma-js';
import { extractRandomFromArray } from '../utils';
import colorArr from '../Colors';

type BasicSkinColorTheme = {
  top: string;
  piece: string;
  bottom: string;
};

let index = colorArr.map((_, i) => i);

const colorTheme = colorArr.reduce((
  acc: { [index: number]: BasicSkinColorTheme },
  color: string,
  i: number
) => {
  const randomIndex = extractRandomFromArray(index);
  index = randomIndex.extractedArray;
  acc[randomIndex.pickedEle] = {
    top: chroma(color).set('hsl.l', 0.8).hex(),
    piece: chroma(color).hex(),
    bottom: chroma(color).set('hsl.l', Math.max(chroma(color).get('hsl.l') - 0.3, 0.3)).hex(),
  };
  return acc;
}, {})

colorTheme[50] = {
  top: 'grey',
  piece: 'darkgrey',
  bottom: 'grey',
};


export default colorTheme;
