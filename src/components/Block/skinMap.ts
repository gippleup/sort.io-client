import { BasicBlockProps } from './Types';

export type SupportedSkin = 
'basic'
| 'holder'
| 'batcap'
| 'pinblock'
| 'eggpan'
| 'elegantline'
| 'elegantbat'
| 'mountain'
| 'upward'
| 'baby'
| 'bearing'
| 'bow'
| 'castle'
| 'chubby'
| 'fat'
| 'horizon'
| 'invader'
| 'kiddo'
| 'lazyboy'
| 'overweight'
| 'pot'
| 'roundbasic'
| 'roundupward'
| 'sleepyworm'
| 'volcano'
| 'wave'

const skinMap: {[T in SupportedSkin]: null} = {
  basic: null,
  holder: null,
  batcap: null,
  pinblock: null,
  eggpan: null,
  elegantline: null,
  mountain: null,
  upward: null,
  elegantbat: null,
  baby: null,
  bearing: null,
  bow: null,
  castle: null,
  chubby: null,
  fat: null,
  horizon: null,
  invader: null,
  kiddo: null,
  lazyboy: null,
  overweight: null,
  pot: null,
  roundbasic: null,
  roundupward: null,
  sleepyworm: null,
  volcano: null,
  wave: null,
};

export default skinMap;
