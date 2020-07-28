import SpikyTop from '../Block/Spiky/SpikyTop';
import SpikyPiece from '../Block/Spiky/SpikyPiece';
import SpikyBottom from '../Block/Spiky/SpikyBottom';
import TopBase from '../Block/TopBase';
import PieceBase from '../Block/PieceBase';
import BottomBase from '../Block/BottomBase';

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
