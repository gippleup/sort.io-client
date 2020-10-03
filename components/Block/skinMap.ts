import { BasicBlockProps } from './Types';

export type skins = 
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
// | 'plain'
// | 'spiky'
// | 'maguni'
// | 'babyblock'
// | 'bird';

const skinMap: {[T in skins]: {
  [T in "top" | "piece" | "bottom"]: React.FC<BasicBlockProps>;
}} = {
  basic: {
    top: require('./Basic/Top').default,
    piece: require('./Basic/Piece').default,
    bottom: require('./Basic/Bottom').default,
  },
  // plain: {
  //   top: require('./Plain/Top').default,
  //   piece: require('./Plain/Piece').default,
  //   bottom: require('./Plain/Bottom').default,
  // },
  holder: {
    top: require('./Holder/Top').default,
    piece: require('./Holder/Piece').default,
    bottom: require('./Holder/Bottom').default,
  },
  batcap: {
    top: require('./BatCap/Top').default,
    piece: require('./BatCap/Piece').default,
    bottom: require('./BatCap/Bottom').default,
  },
  pinblock: {
    top: require('./PinBlock/Top').default,
    piece: require('./PinBlock/Piece').default,
    bottom: require('./PinBlock/Bottom').default,
  },
  eggpan: {
    top: require('./EggPan/Top').default,
    piece: require('./EggPan/Piece').default,
    bottom: require('./EggPan/Bottom').default,
  },
  elegantline: {
    top: require('./ElegantLine/Top').default,
    piece: require('./ElegantLine/Piece').default,
    bottom: require('./ElegantLine/Bottom').default,
  },
  mountain: {
    top: require('./Mountain/Top').default,
    piece: require('./Mountain/Piece').default,
    bottom: require('./Mountain/Bottom').default,
  },
  upward: {
    top: require('./Upward/Top').default,
    piece: require('./Upward/Piece').default,
    bottom: require('./Upward/Bottom').default,
  },
  elegantbat: {
    top: require('./ElegantBat/Top').default,
    piece: require('./ElegantBat/Piece').default,
    bottom: require('./ElegantBat/Bottom').default,
  },
  baby: {
    top: require('./Baby/Top').default,
    piece: require('./Baby/Piece').default,
    bottom: require('./Baby/Bottom').default,
  },
  bearing: {
    top: require('./Bearing/Top').default,
    piece: require('./Bearing/Piece').default,
    bottom: require('./Bearing/Bottom').default,
  },
  bow: {
    top: require('./Bow/Top').default,
    piece: require('./Bow/Piece').default,
    bottom: require('./Bow/Bottom').default,
  },
  castle: {
    top: require('./Castle/Top').default,
    piece: require('./Castle/Piece').default,
    bottom: require('./Castle/Bottom').default,
  },
  chubby: {
    top: require('./Chubby/Top').default,
    piece: require('./Chubby/Piece').default,
    bottom: require('./Chubby/Bottom').default,
  },
  fat: {
    top: require('./Fat/Top').default,
    piece: require('./Fat/Piece').default,
    bottom: require('./Fat/Bottom').default,
  },
  horizon: {
    top: require('./Horizon/Top').default,
    piece: require('./Horizon/Piece').default,
    bottom: require('./Horizon/Bottom').default,
  },
  invader: {
    top: require('./Invader/Top').default,
    piece: require('./Invader/Piece').default,
    bottom: require('./Invader/Bottom').default,
  },
  kiddo: {
    top: require('./Kiddo/Top').default,
    piece: require('./Kiddo/Piece').default,
    bottom: require('./Kiddo/Bottom').default,
  },
  lazyboy: {
    top: require('./LazyBoy/Top').default,
    piece: require('./LazyBoy/Piece').default,
    bottom: require('./LazyBoy/Bottom').default,
  },
  overweight: {
    top: require('./Overweight/Top').default,
    piece: require('./Overweight/Piece').default,
    bottom: require('./Overweight/Bottom').default,
  },
  pot: {
    top: require('./Pot/Top').default,
    piece: require('./Pot/Piece').default,
    bottom: require('./Pot/Bottom').default,
  },
  roundbasic: {
    top: require('./RoundBasic/Top').default,
    piece: require('./RoundBasic/Piece').default,
    bottom: require('./RoundBasic/Bottom').default,
  },
  roundupward: {
    top: require('./RoundUpward/Top').default,
    piece: require('./RoundUpward/Piece').default,
    bottom: require('./RoundUpward/Bottom').default,
  },
  sleepyworm: {
    top: require('./SleepyWorm/Top').default,
    piece: require('./SleepyWorm/Piece').default,
    bottom: require('./SleepyWorm/Bottom').default,
  },
  volcano: {
    top: require('./Volcano/Top').default,
    piece: require('./Volcano/Piece').default,
    bottom: require('./Volcano/Bottom').default,
  },
  wave: {
    top: require('./Wave/Top').default,
    piece: require('./Wave/Piece').default,
    bottom: require('./Wave/Bottom').default,
  },
  // spiky: {
  //   top: require('./Spiky/Top').default,
  //   piece: require('./Spiky/Piece').default,
  //   bottom: require('./Spiky/Bottom').default,
  // },
  // maguni: {
  //   top: require('./Maguni/Top').default,
  //   piece: require('./Maguni/Piece').default,
  //   bottom: require('./Maguni/Bottom').default,
  // },
  // babyblock: {
  //   top: require('./BabyBlock/Top').default,
  //   piece: require('./BabyBlock/Piece').default,
  //   bottom: require('./BabyBlock/Bottom').default,
  // },
  // bird: {
  //   top: require('./Bird/Top').default,
  //   piece: require('./Bird/Piece').default,
  //   bottom: require('./Bird/Bottom').default,
  // }
};

export default skinMap;
