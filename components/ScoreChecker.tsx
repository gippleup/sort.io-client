import React from 'react';
import {View, Text} from 'react-native';
import Block from './Block';
import TopBase from './Block/TopBase';
import BottomBase from './Block/BottomBase';
import PieceBase from './Block/PieceBase';
import skinMap, {skins} from './BlockStack/skinMap';
import styled from 'styled-components';
import BlockStack from './BlockStack';
import BlockFrame from './BlockStack/BlockFrame';
import { BlockTypes } from './Block/Types';

const ScoreCheckerContainer: typeof View = styled(View)``;

const Row: typeof View = styled(View)`
  flex-direction: row;
`;

type ScoreCheckerProps = {
  maxScore: number;
  curScore: number;
  skin: skins;
  layout: number[][];
  scale: number;
  intervalWidth?: number;
  intervalHeight?: number;
};

const ScoreChecker: React.FC<ScoreCheckerProps> = (props) => {
  let iconToDrawCount = props.maxScore;
  let scoreToCheckCount = props.curScore;

  const renderSpace = () => (
    <View
      style={{
        width: props.intervalWidth ? props.intervalWidth : 15 * props.scale,
        height: props.intervalHeight ? props.intervalHeight : 15 * props.scale,
      }}
    />
  );

  const renderScoreIcon = (state: 'active' | 'deactive') => {
    const type = state === 'active' ? 0 : 9;
    return (
      <View>
        <Block
          shape={skinMap[props.skin].top}
          base={TopBase}
          type={type}
          scale={props.scale}
        />
        <Block
          shape={skinMap[props.skin].piece}
          base={PieceBase}
          type={type}
          scale={props.scale}
        />
        <Block
          shape={skinMap[props.skin].bottom}
          base={BottomBase}
          type={type}
          scale={props.scale}
        />
      </View>
    );
  };

  const InvisibleFrame = (
    <View style={{opacity: 0}}>
      <BlockFrame pieceCount={1} scale={props.scale} />
    </View>
  );

  const mappedLayout = props.layout.map((row, i) => {
    const isEndOfRow = i === props.layout.length - 1;
    return (
      <>
        <Row>
          {row.map((bool, j) => {
            if (!iconToDrawCount) {
              return;
            } else if (bool) {
              iconToDrawCount--;
              scoreToCheckCount--;
              const iconState: 'active' | 'deactive' =
                scoreToCheckCount > 0 ? 'active' : 'deactive';
              const isEndOfCol = j === row.length - 1;
              return (
                <>
                  {renderScoreIcon(iconState)}
                  {isEndOfCol ? <></> : renderSpace()}
                </>
              );
            } else {
              return InvisibleFrame;
            }
          })}
        </Row>
        {isEndOfRow ? <></> : renderSpace()}
      </>
    );
  });

  return <ScoreCheckerContainer>{mappedLayout}</ScoreCheckerContainer>;
};

export default ScoreChecker;
