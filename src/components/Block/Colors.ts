import chroma from 'chroma-js';

const mainColor = chroma('red').hex();

const colorArr: string[] = [];
export const blockTypeCount = 18; // This is the max allowance for color counts.
const h = chroma(mainColor).get('hsl.h');
const s = chroma(mainColor).get('hsl.s');
const l = chroma(mainColor).get('hsl.l');
for (let i = 0; i < blockTypeCount; i += 1) {
  const adjustedColor = chroma(mainColor)
    .set('hsl.h', h + 360 / blockTypeCount * i)
    .set('hsl.l',
      i % 4 === 0 ? l
      : i % 4 === 1 ? l - 0.2
        : i % 4 === 2 ? l
          : i % 4 === 3 ? l + 0.2 : '')
    // .set('hsl.s',
    //   i % 4 === 0 ? s
    //     : i % 4 === 1 ? s - 0.1
    //       : i % 4 === 2 ? s + 0.1
    //         : i % 4 === 3 ? s - 0.2 : '')
    .hex()
  colorArr.push(adjustedColor)
}

export default colorArr;