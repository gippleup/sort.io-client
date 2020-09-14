import React, { Component } from 'react'
import { Text, View, Animated, Easing, ViewStyle } from 'react-native'
import NativeRefBox from './NativeRefBox';

export type LoadingWaveProps = {
  waveShape?: 'horizontal' | 'vertical';
  halfDuration?: number;
  particleCount?: number;
  particleRenderer?: (i: number) => JSX.Element;
  amplitude?: number;
  isManual?: boolean;
}

export class LoadingWave extends Component<LoadingWaveProps> {
  waveAnim = new Animated.Value(0);
  loop: Animated.CompositeAnimation | undefined;

  constructor(props: Readonly<LoadingWaveProps>) {
    super(props);
    this.startWave = this.startWave.bind(this);
  }

  startWave() {
    const { waveAnim, props } = this;
    waveAnim.stopAnimation();
    this.loop = Animated.loop(
      Animated.timing(waveAnim, {
        toValue: 1,
        duration: props.halfDuration || 300,
        useNativeDriver: true,
        easing: Easing.linear
      }),
    );
    this.loop.start();
  }

  stopWave() {
    this.loop?.stop();
    this.waveAnim.setValue(0);
  }

  componentDidMount() {
    if (!this.props.isManual) {
      this.startWave();
    }
  }

  componentWillUnmount() {
    this.stopWave();
  }

  render() {
    const { waveAnim, props } = this;
    const targetStyleProp = props.waveShape === 'horizontal' ? 'translateX' : 'translateY';
    return (
      <>
        {Array(props.particleCount || 5).fill(1).map((_, i) => {
          const boxRef = React.createRef<NativeRefBox>();
          waveAnim.addListener((state) => {
            boxRef.current?.setStyle({
              [targetStyleProp]: Math.sin(i + state.value * Math.PI * 2) * (props.amplitude || 3)
            })
          })
          return (
            <NativeRefBox
              ref={boxRef}
              key={i}
            >
              {props.particleRenderer 
              ? props.particleRenderer(i) 
              : props.children}
            </NativeRefBox>
          )
        })}
      </>
    )
  }
}

export default LoadingWave
