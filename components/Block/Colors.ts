import chroma from 'chroma-js';

const mainColor = chroma('red').hex();

const colorArr: string[] = [];
const blockTypeCount = 24; // This is the max allowance for color counts.
const hue = chroma(mainColor).get('hsl.h');
for (let i = 0; i < blockTypeCount; i += 1) {
  const adjustedColor = chroma(mainColor)
    .set('hsl.h', hue + 360 / blockTypeCount * i)
    .set('hsl.l',
      i % 4 === 0 ? 0.7
        : i % 4 === 1 ? 0.3
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

export default colorArr;