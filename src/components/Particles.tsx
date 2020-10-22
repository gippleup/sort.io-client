import React, { Component, RefObject } from 'react'
import { Text, View, Animated, Easing } from 'react-native'
import NativeRefBox from './NativeRefBox';

function lerp(start: number, end: number, amt: number) {
  return (1 - amt) * start + amt * end
}

type ParticlesProps = {
  particle: React.ComponentClass | React.FunctionComponent;
  rate?: number;
  sprayCone?: number;
  type?: 'continuous' | 'one-shot';
  initialProps?: {
    speed?: number;
    size?: number;
    opacity?: number;
    growRate?: number;
    xRandomiser?: number;
    yRandomiser?: number;
    speedRandomiser?: number;
    sizeRandomiser?: number;
    growRateRandomiser?: number;
  }
  lifetimeProps?: {
    acceleration?: number;
    gravity?: number;
    angleRandomiser?: number;
    opacityRandomiser?: number;
    destroyMode?: 'particleStopped' | 'fadeToInvisible' | 'timeoutExpired';
    timeout?: number;
  }
}

export class Particles extends Component<ParticlesProps, {}> {
  constructor(props: Readonly<ParticlesProps>) {
    super(props);
  }
  particleBaseRefs: RefObject<NativeRefBox>[] = [];

  render() {
    const {props} = this;
    const ParticleBase = props.particle;
    return (
      <View>
        {Array(20).fill(1).map((_, i) => {
          const boxRef = React.createRef<NativeRefBox>();
          this.particleBaseRefs.push(boxRef);
          return (
            <NativeRefBox ref={boxRef} style={{
              position: 'absolute',
              backgroundColor: 'red'
            }} key={i}>
              <ParticleBase/>
            </NativeRefBox>
          )
        })}
      </View>
    )
  }
}

export default Particles
