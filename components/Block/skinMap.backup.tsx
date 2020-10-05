import React from 'react';
import BlockBase from './BlockBase';
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

const SuspenseBlock = (Block: React.LazyExoticComponent<React.FC<BasicBlockProps>>, part: "top" | "piece" | "bottom") => {
  const height = {
    top: 8,
    piece: 24,
    bottom: 34,
  }

  const color = {
    top: 'grey',
    piece: 'darkgrey',
    bottom: 'grey',
  }

  return (props: BasicBlockProps) => (
    <React.Suspense fallback={<BlockBase width={66} height={height[part]} scale={props.scale} color={color[part]} />}>
      <Block {...props} />
    </React.Suspense>
  )
}

const skinMap: {[T in skins]: {
  [T in "top" | "piece" | "bottom"]: React.FC<BasicBlockProps>;
}} = {
  basic: {
    top: SuspenseBlock(React.lazy(() => import('./Basic/Top')), "top"),
    piece: SuspenseBlock(React.lazy(() => import('./Basic/Piece')), "piece"),
    bottom: SuspenseBlock(React.lazy(() => import('./Basic/Bottom')), "bottom"),
  },
  holder: {
    top: SuspenseBlock(React.lazy(() => import('./Holder/Top')), "top"),
    piece: SuspenseBlock(React.lazy(() => import('./Holder/Piece')), "piece"),
    bottom: SuspenseBlock(React.lazy(() => import('./Holder/Bottom')), "bottom"),
  },
  batcap: {
    top: SuspenseBlock(React.lazy(() => import('./BatCap/Top')), "top"),
    piece: SuspenseBlock(React.lazy(() => import('./BatCap/Piece')), "piece"),
    bottom: SuspenseBlock(React.lazy(() => import('./BatCap/Bottom')), "bottom"),
  },
  pinblock: {
    top: SuspenseBlock(React.lazy(() => import('./PinBlock/Top')), "top"),
    piece: SuspenseBlock(React.lazy(() => import('./PinBlock/Piece')), "piece"),
    bottom: SuspenseBlock(React.lazy(() => import('./PinBlock/Bottom')), "bottom"),
  },
  eggpan: {
    top: SuspenseBlock(React.lazy(() => import('./EggPan/Top')), "top"),
    piece: SuspenseBlock(React.lazy(() => import('./EggPan/Piece')), "piece"),
    bottom: SuspenseBlock(React.lazy(() => import('./EggPan/Bottom')), "bottom"),
  },
  elegantline: {
    top: SuspenseBlock(React.lazy(() => import('./ElegantLine/Top')), "top"),
    piece: SuspenseBlock(React.lazy(() => import('./ElegantLine/Piece')), "piece"),
    bottom: SuspenseBlock(React.lazy(() => import('./ElegantLine/Bottom')), "bottom"),
  },
  mountain: {
    top: SuspenseBlock(React.lazy(() => import('./Mountain/Top')), "top"),
    piece: SuspenseBlock(React.lazy(() => import('./Mountain/Piece')), "piece"),
    bottom: SuspenseBlock(React.lazy(() => import('./Mountain/Bottom')), "bottom"),
  },
  upward: {
    top: SuspenseBlock(React.lazy(() => import('./Upward/Top')), "top"),
    piece: SuspenseBlock(React.lazy(() => import('./Upward/Piece')), "piece"),
    bottom: SuspenseBlock(React.lazy(() => import('./Upward/Bottom')), "bottom"),
  },
  elegantbat: {
    top: SuspenseBlock(React.lazy(() => import('./ElegantBat/Top')), "top"),
    piece: SuspenseBlock(React.lazy(() => import('./ElegantBat/Piece')), "piece"),
    bottom: SuspenseBlock(React.lazy(() => import('./ElegantBat/Bottom')), "bottom"),
  },
  baby: {
    top: SuspenseBlock(React.lazy(() => import('./Baby/Top')), "top"),
    piece: SuspenseBlock(React.lazy(() => import('./Baby/Piece')), "piece"),
    bottom: SuspenseBlock(React.lazy(() => import('./Baby/Bottom')), "bottom"),
  },
  bearing: {
    top: SuspenseBlock(React.lazy(() => import('./Bearing/Top')), "top"),
    piece: SuspenseBlock(React.lazy(() => import('./Bearing/Piece')), "piece"),
    bottom: SuspenseBlock(React.lazy(() => import('./Bearing/Bottom')), "bottom"),
  },
  bow: {
    top: SuspenseBlock(React.lazy(() => import('./Bow/Top')), "top"),
    piece: SuspenseBlock(React.lazy(() => import('./Bow/Piece')), "piece"),
    bottom: SuspenseBlock(React.lazy(() => import('./Bow/Bottom')), "bottom"),
  },
  castle: {
    top: SuspenseBlock(React.lazy(() => import('./Castle/Top')), "top"),
    piece: SuspenseBlock(React.lazy(() => import('./Castle/Piece')), "piece"),
    bottom: SuspenseBlock(React.lazy(() => import('./Castle/Bottom')), "bottom"),
  },
  chubby: {
    top: SuspenseBlock(React.lazy(() => import('./Chubby/Top')), "top"),
    piece: SuspenseBlock(React.lazy(() => import('./Chubby/Piece')), "piece"),
    bottom: SuspenseBlock(React.lazy(() => import('./Chubby/Bottom')), "bottom"),
  },
  fat: {
    top: SuspenseBlock(React.lazy(() => import('./Fat/Top')), "top"),
    piece: SuspenseBlock(React.lazy(() => import('./Fat/Piece')), "piece"),
    bottom: SuspenseBlock(React.lazy(() => import('./Fat/Bottom')), "bottom"),
  },
  horizon: {
    top: SuspenseBlock(React.lazy(() => import('./Horizon/Top')), "top"),
    piece: SuspenseBlock(React.lazy(() => import('./Horizon/Piece')), "piece"),
    bottom: SuspenseBlock(React.lazy(() => import('./Horizon/Bottom')), "bottom"),
  },
  invader: {
    top: SuspenseBlock(React.lazy(() => import('./Invader/Top')), "top"),
    piece: SuspenseBlock(React.lazy(() => import('./Invader/Piece')), "piece"),
    bottom: SuspenseBlock(React.lazy(() => import('./Invader/Bottom')), "bottom"),
  },
  kiddo: {
    top: SuspenseBlock(React.lazy(() => import('./Kiddo/Top')), "top"),
    piece: SuspenseBlock(React.lazy(() => import('./Kiddo/Piece')), "piece"),
    bottom: SuspenseBlock(React.lazy(() => import('./Kiddo/Bottom')), "bottom"),
  },
  lazyboy: {
    top: SuspenseBlock(React.lazy(() => import('./LazyBoy/Top')), "top"),
    piece: SuspenseBlock(React.lazy(() => import('./LazyBoy/Piece')), "piece"),
    bottom: SuspenseBlock(React.lazy(() => import('./LazyBoy/Bottom')), "bottom"),
  },
  overweight: {
    top: SuspenseBlock(React.lazy(() => import('./Overweight/Top')), "top"),
    piece: SuspenseBlock(React.lazy(() => import('./Overweight/Piece')), "piece"),
    bottom: SuspenseBlock(React.lazy(() => import('./Overweight/Bottom')), "bottom"),
  },
  pot: {
    top: SuspenseBlock(React.lazy(() => import('./Pot/Top')), "top"),
    piece: SuspenseBlock(React.lazy(() => import('./Pot/Piece')), "piece"),
    bottom: SuspenseBlock(React.lazy(() => import('./Pot/Bottom')), "bottom"),
  },
  roundbasic: {
    top: SuspenseBlock(React.lazy(() => import('./RoundBasic/Top')), "top"),
    piece: SuspenseBlock(React.lazy(() => import('./RoundBasic/Piece')), "piece"),
    bottom: SuspenseBlock(React.lazy(() => import('./RoundBasic/Bottom')), "bottom"),
  },
  roundupward: {
    top: SuspenseBlock(React.lazy(() => import('./RoundUpward/Top')), "top"),
    piece: SuspenseBlock(React.lazy(() => import('./RoundUpward/Piece')), "piece"),
    bottom: SuspenseBlock(React.lazy(() => import('./RoundUpward/Bottom')), "bottom"),
  },
  sleepyworm: {
    top: SuspenseBlock(React.lazy(() => import('./SleepyWorm/Top')), "top"),
    piece: SuspenseBlock(React.lazy(() => import('./SleepyWorm/Piece')), "piece"),
    bottom: SuspenseBlock(React.lazy(() => import('./SleepyWorm/Bottom')), "bottom"),
  },
  volcano: {
    top: SuspenseBlock(React.lazy(() => import('./Volcano/Top')), "top"),
    piece: SuspenseBlock(React.lazy(() => import('./Volcano/Piece')), "piece"),
    bottom: SuspenseBlock(React.lazy(() => import('./Volcano/Bottom')), "bottom"),
  },
  wave: {
    top: SuspenseBlock(React.lazy(() => import('./Wave/Top')), "top"),
    piece: SuspenseBlock(React.lazy(() => import('./Wave/Piece')), "piece"),
    bottom: SuspenseBlock(React.lazy(() => import('./Wave/Bottom')), "bottom"),
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
