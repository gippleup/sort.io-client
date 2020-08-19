import chroma from 'chroma-js';

type SpikeSkinColorTheme = {
  cap: string;
  spike: string;
  bodyFill: string;
  bottomFill: string;
  feet: string;
};


const randomIndexFromArray = (array: any[]): number => {
  const randomValidIndex = Math.floor(Math.random() * array.length);
  return randomValidIndex;
}

const pickRandomFromArray = (array: any[]) => {
  return array[randomIndexFromArray(array)];
}

const extractRandomFromArray = (array: any[]) => {
  const randomIndex = randomIndexFromArray(array);
  const pickedEle = array[randomIndex];
  const front = array.slice(0, randomIndex);
  const latter = array.slice(randomIndex + 1, array.length);
  const extractedArray = front.concat(latter)
  return {
    pickedEle,
    extractedArray,
  };
}

const mainColor = chroma('red').hex();

const colorArr = [];
const blockTypeCount = 24;
const hue = chroma(mainColor).get('hsl.h');
for (let i = 0; i < blockTypeCount; i += 1) {
  const adjustedColor = chroma(mainColor)
    .set('hsl.h', hue + 360 / blockTypeCount * i)
    .set('hsl.l',
      i % 4 === 0 ? 0.7
        : i % 4 === 1 ? 0.6
          : i % 4 === 2 ? 0.4
            : i % 4 === 3 ? 0.4 : '')
    .set('hsl.s',
      i % 4 === 0 ? 1
        : i % 4 === 1 ? 0.6
          : i % 4 === 2 ? 0.6
            : i % 4 === 3 ? 1 : '')
    .hex()
  colorArr.push(adjustedColor)
}

let index = colorArr.map((_, i) => i);

const colorTheme = colorArr.reduce((
  acc: {[index: number]: SpikeSkinColorTheme},
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
