import SpikyTop from './Spiky/SpikyTop';
import SpikyPiece from './Spiky/SpikyPiece';
import SpikyBottom from './Spiky/SpikyBottom';
import TopBase from './Basic/TopBase';
import PieceBase from './Basic/PieceBase';
import BottomBase from './Basic/BottomBase';

export type skins = 'basic' | 'spiky';

const skinMap = {
  basic: {
    top: TopBase,
    piece: PieceBase,
    bottom: BottomBase,
  },
  spiky: {
    top: SpikyTop,
    piece: SpikyPiece,
    bottom: SpikyBottom,
  },
};

export default skinMap;
