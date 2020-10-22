import React, { Component } from 'react'
import { Text, View, Animated, Easing } from 'react-native'
import { FlexHorizontal } from '../../../../components/Generic/StyledComponents';
import LoadingWave, { LoadingWaveProps } from '../../../../components/LoadingWave';
import chroma from 'chroma-js';
import RematchStatusPlayerAnimation from './RematchStatusAnimation/RematchStatusPlayerAnimation';

type RematchStatusAnimationProps = {
  beingInvited?: boolean;
}

export class RematchStatusAnimation extends Component<RematchStatusAnimationProps> {
  playerRef = React.createRef<RematchStatusPlayerAnimation>();
  opponentRef = React.createRef<RematchStatusPlayerAnimation>();
  constructor(props: Readonly<RematchStatusAnimationProps>) {
    super(props);
  }

  render() {
    const {playerRef, opponentRef} = this;

    const wavePropsToPass: LoadingWaveProps = {
      particleCount: 5,
      waveShape: 'horizontal',
      halfDuration: 300,
      particleRenderer: (i) => {
        return (
          <View
            style={{
              width: 5,
              height: 5,
              marginRight: 10,
              backgroundColor: chroma.random().hex()
            }}
          />
        )
      },
    }

    return (
      <FlexHorizontal style={{ justifyContent: 'center' }}>
        <RematchStatusPlayerAnimation ref={playerRef} type="player" />
        <FlexHorizontal style={{translateX: -5}}>
          <LoadingWave {...wavePropsToPass} />
        </FlexHorizontal>
        <RematchStatusPlayerAnimation ref={opponentRef} type="opponent" />
      </FlexHorizontal>
    )
  }
}

export default RematchStatusAnimation
