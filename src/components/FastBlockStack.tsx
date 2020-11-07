import React from 'react'
import { View, Text, ViewStyle, Animated, Easing } from 'react-native'
import Constants from '../assets/Constants';
import Block from './Block';
import { SupportedSkin } from './Block/skinMap';
import BlockFrame from './BlockStack/BlockFrame';
import { FastStackStatus } from './FastBlockBoard/FastBoardModel';

type FastBlockStackProps = {
  stack: number[];
  completed: boolean;
  scale?: number;
  noAnimation?: boolean;
  noGradient?: boolean;
  skin?: SupportedSkin;
  style?: ViewStyle;
  status?: FastStackStatus;
  onTouchEnd?: () => any;
}

class FastBlockStack extends React.Component<FastBlockStackProps> {
  constructor(props: Readonly<FastBlockStackProps>) {
    super(props);
  }

  dockAnim = new Animated.Value(0);

  shouldComponentUpdate(nextProps: FastBlockStackProps) {
    const prevProps = this.props;
    const reasons = [
      prevProps.status !== nextProps.status,
      prevProps.scale !== nextProps.scale,
      prevProps.skin !== nextProps.skin,
      prevProps.completed !== nextProps.completed,
      prevProps.noAnimation !== nextProps.noAnimation,
      prevProps.noGradient !== nextProps.noGradient,
      JSON.stringify(prevProps.stack) !== JSON.stringify(nextProps.stack),
    ]

    const haveReasonToUpdate = reasons.filter((bool) => bool === true).length;
    if (haveReasonToUpdate) {
      return true;
    }

    return false;
  }

  componentDidUpdate() {
    const {dockAnim} = this;
    const {status} = this.props;
    dockAnim.stopAnimation();
    if (status === "docked") {
      dockAnim.setValue(1);
      Animated.timing(dockAnim, {
        toValue: 0,
        useNativeDriver: true,
        easing: Easing.in(Easing.bounce),
        duration: 300,
      }).start();
    } else if (status === "undocked") {
      Animated.timing(dockAnim, {
        toValue: 1,
        useNativeDriver: true,
        duration: 100,
      }).start();
    } else if (status === "neutral") {
      dockAnim.setValue(0);
    }
  }

  render() {
    const {
      stack,
      completed,
      noAnimation,
      noGradient,
      scale = 1,
      skin = "basic",
      style,
      onTouchEnd,
    } = this.props;

    const {dockAnim} = this;
  
    const translateY = dockAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -32 * scale],
    });
  
    const bottom = stack[0] === - 1 ? 50 : stack[0];
  
    const Bottom = () => (
      <Block
        type={bottom}
        part="bottom"
        skin={skin}
        scale={scale}
        noGradient={noGradient}
      />
    )
  
    const Top = () => {
      if (!completed) return <></>;
      return (
        <Block
          type={bottom}
          part="top"
          skin={skin}
          scale={scale}
          noGradient={noGradient}  
        />
      );
    }
  
    return (
      <View onTouchEnd={onTouchEnd} style={style}>
        <Top/>
        {stack
          .filter((blockType) => blockType !== -1)
          .reverse()
          .map((blockType, i) => {
            const Piece = () => (
              <Block
                key={i}
                type={blockType}
                part="piece"
                skin={skin}
                noGradient={noGradient}
                scale={scale}
              />
            );
  
            if (i === 0) {
              return (
                <Animated.View key={i} style={{transform: [{translateY}]}}>
                  <Piece/>
                </Animated.View>
              )
            }
            return <Piece key={i} />
        })}
        <Bottom/>
      </View>
    )
  }
}

export default FastBlockStack
