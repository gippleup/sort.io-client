import React, { Fragment } from 'react';
import {View, Text} from 'react-native';
import {skins} from './BlockStack/skinMap';
import styled from 'styled-components';
import BlockFrame from './BlockStack/BlockFrame';
import ScoreIcon from './ScoreChecker/ScoreIcon';

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

  const Space = () => (
    <View
      style={{
        width: props.intervalWidth ? props.intervalWidth : 15 * props.scale,
        height: props.intervalHeight ? props.intervalHeight : 15 * props.scale,
      }}
    />
  );

  const InvisibleFrame = () => (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{opacity: 0}}>
      <BlockFrame pieceCount={1} scale={props.scale} />
    </View>
  );

  const mappedLayout = props.layout.map((row, i) => {
    const isEndOfRow = i === props.layout.length - 1;
    return (
      <Fragment key={'fragment' + i}>
        <Row key={'row' + i}>
          {row.map((bool, j) => {
            if (!iconToDrawCount) {
              return;
            } else if (bool) {
              const iconType = scoreToCheckCount > 0 ? 0 : 9;
              const isEndOfCol = j === row.length - 1;
              scoreToCheckCount--;
              iconToDrawCount--;
              return (
                <Fragment key={'fragment' + i + j}>
                  <ScoreIcon
                    key={'scoreIcon' + j}
                    scale={props.scale}
                    skin={props.skin}
                    type={iconType}
                  />
                  {isEndOfCol ? <></> : <Space key={'space' + i + j} />}
                </Fragment>
              );
            } else {
              return <InvisibleFrame key={'invisibleFrame' + j} />;
            }
          })}
        </Row>
        {isEndOfRow ? <></> : <Space key={'space' + i} />}
      </Fragment>
    );
  });

  return <ScoreCheckerContainer>{mappedLayout}</ScoreCheckerContainer>;
};

export default ScoreChecker;
