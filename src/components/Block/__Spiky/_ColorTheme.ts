import chroma from 'chroma-js';
import { extractRandomFromArray } from '../utils';
import colorArr from '../Colors';

type ColorTheme = {
  cap: string;
  spike: string;
  bodyFill: string;
  bottomFill: string;
  feet: string;
};

let index = colorArr.map((_, i) => i);

const colorTheme = colorArr.reduce((
  acc: {[index: number]: ColorTheme},
  color: string,
  i: number
) => {
  const randomIndex = extractRandomFromArray(index);
  index = randomIndex.extractedArray;
  acc[randomIndex.pickedEle] = {
    cap: chroma(color).set('hsl.l', 0.8).hex(),
    spike: chroma(color).hex(),
    bodyFill: chroma(color).hex(),
    bottomFill: chroma(color).set('hsl.l', Math.max(chroma(color).get('hsl.l') - 0.3, 0.3)).hex(),
    feet: chroma(color).set('hsl.l', 0.8).hex(),
  };
  return acc;
}, {})

colorTheme[50] = {
  cap: 'grey',
  spike: 'grey',
  bodyFill: 'darkgrey',
  bottomFill: 'grey',
  feet: 'grey',
};


export default colorTheme;
