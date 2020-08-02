import React, {Fragment, RefObject} from 'react';
import {View, Text, Easing} from 'react-native';
import {skins} from './BlockStack/skinMap';
import styled from 'styled-components';
import BlockFrame from './BlockStack/BlockFrame';
import ScoreIcon from './ScoreChecker/ScoreIcon';
import Constants from '../assets/Constants';
import RefBox from './RefBox';

const ScoreCheckerContainer: typeof View = styled(View)``;

const Row: typeof View = styled(View)`
  flex-direction: row;
`;

type ScoreCheckerProps = {
  maxScore: number;
  initialScore: number;
  skin: skins;
  layout: number[][];
  scale: number;
  intervalWidth?: number;
  intervalHeight?: number;
};

class ScoreChecker extends React.Component<ScoreCheckerProps> {
  constructor(props: ScoreCheckerProps) {
    super(props);
    this.setScore = this.setScore.bind(this);
  }

  icons: RefObject<RefBox>[] = [];

  setScore(score: number) {
    this.icons.forEach((iconRef, i) => {
      const targetRef = iconRef.current;
      if (!targetRef) {
        return;
      }
      if (i < score && targetRef?.opacity < 1) {
        targetRef.setOpacity(1);
        targetRef.setScale(0);
        targetRef.animateScale(1, 300, Easing.in(Easing.elastic(3))).start();
      } else if (i >= score && targetRef?.opacity > 0) {
        targetRef.animateScale(0, 300, Easing.in(Easing.back(3))).start();
        targetRef.animateOpacity(0).start();
      }
    });
  }

  componentDidMount() {
    this.setScore(this.props.initialScore);
  }

  render() {
    const {props, state} = this;
    let iconToDrawCount = this.props.maxScore;
    // let scoreToCheckCount = state.curScore;
    const Space = () => (
      <View
        style={{
          width: props.intervalWidth ? props.intervalWidth : 15 * props.scale,
          height: props.intervalHeight
            ? props.intervalHeight
            : 15 * props.scale,
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
                // const iconType = scoreToCheckCount > 0 ? 0 : 9;
                const isEndOfCol = j === row.length - 1;
                // scoreToCheckCount--;
                iconToDrawCount--;
                const iconRef = React.createRef<RefBox>();
                this.icons.push(iconRef);
                return (
                  <Fragment key={'fragment' + i + j}>
                    <View
                      style={{
                        width: Constants.blockWidth * props.scale,
                        height: Constants.blockHeight.count(1) * props.scale,
                      }}>
                      <View style={{position: 'absolute'}}>
                        <BlockFrame pieceCount={1} scale={props.scale} />
                      </View>
                      <RefBox style={{opacity: 0}} ref={iconRef}>
                        <ScoreIcon
                          key={'scoreIcon' + j}
                          scale={props.scale}
                          skin={props.skin}
                          type={0}
                        />
                      </RefBox>
                    </View>
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
  }
}

export default ScoreChecker;
