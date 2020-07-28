import React from 'react'
import {View, Text, Picker, Animated, Easing} from 'react-native';
import {TBlock} from './BlockBoard/Model/model';
import PieceBase from './Block/PieceBase';
import BottomBase from './Block/BottomBase';
import TopBase from './Block/TopBase';
import styled from 'styled-components';

const BaseContainer: typeof View = styled(View)``;

const BlockContainer: typeof View = styled(View)``;

type BlockStackProps = {
  data: TBlock[];
  max: number;
  completed: boolean;
  onPress?: () => void;
  isBase: boolean;
  curState: 'neutral' | 'docked' | 'undocked';
  prevState: 'neutral' | 'docked' | 'undocked';
};

const BlockStack: React.FC<BlockStackProps> = (props) => {
  const dockAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const dock = React.useCallback(() => {
    dockAnim.stopAnimation();
    Animated.timing(dockAnim, {
      toValue: 0,
      useNativeDriver: true,
      duration: 500,
      easing: Easing.in(Easing.bounce),
    }).start();
  }, [dockAnim]);

  const undock = React.useCallback(() => {
    dockAnim.stopAnimation();
    Animated.timing(dockAnim, {
      toValue: 1,
      useNativeDriver: true,
      duration: 500,
      easing: Easing.in(Easing.elastic(4)),
    }).start();
  }, [dockAnim]);

  const disappear = React.useCallback(() => {
    scaleAnim.stopAnimation();
    scaleAnim.setValue(1);
    Animated.timing(scaleAnim, {
      toValue: 0,
      useNativeDriver: true,
      duration: 100,
      easing: Easing.in(Easing.ease),
    }).start();
  }, [scaleAnim]);

  const appear = React.useCallback(() => {
    dockAnim.stopAnimation();
    scaleAnim.stopAnimation();
    dockAnim.setValue(1);
    scaleAnim.setValue(0);
    Animated.timing(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      duration: 100,
      easing: Easing.in(Easing.cubic),
    }).start(dock);
  }, [dock, dockAnim, scaleAnim]);

  const sit = React.useCallback(() => {
    dockAnim.stopAnimation();
    dockAnim.setValue(0);
  }, [dockAnim]);

  const animation = {
    dock,
    undock,
    disappear,
    appear,
    sit,
  };

  const colors: {[index: number]: string} = {
    0: 'red',
    1: 'orange',
    2: 'white',
    3: 'dodgerblue',
  };

  const renderTopBlock = (blockType: number) => {
    if (!props.completed) {
      return <></>;
    }
    return <TopBase fill={colors[blockType]} />;
  };

  const renderBase = () => {
    return (
      <BaseContainer
        onTouchStart={() => {
          if (props.onPress) {
            props.onPress();
          }
        }}>
        <TopBase fill="rgba(0,0,0,0.5)" />
        {Array(props.max)
          .fill(0)
          .map((value, i) => (
            <PieceBase key={i} fill="rgba(0,0,0,0.5)" />
          ))}
        <BottomBase fill="rgba(0,0,0,0.5)" />
      </BaseContainer>
    );
  };

  const renderBlocks = () => {
    if (!props.data.length) {
      return (
        <BlockContainer>
          <BottomBase fill="grey" />
        </BlockContainer>
      );
    }
    const topPiece = props.data[props.data.length - 1];
    const restPieces = props.data.slice(0, props.data.length - 1);
    return (
      <BlockContainer>
        {renderTopBlock(topPiece.type)}
        <Animated.View
          style={{
            transform: [
              {
                translateY: dockAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -40],
                }),
              },
              {
                scale: scaleAnim,
              },
            ],
          }}>
          <PieceBase fill={colors[topPiece.type]} />
        </Animated.View>
        {restPieces.reverse().map((block, i) => (
          <PieceBase key={i} fill={colors[block.type]} />
        ))}
        <BottomBase fill={colors[props.data[0].type]} />
      </BlockContainer>
    );
  };

  React.useEffect(() => {
    if (!props.isBase) {
      let targetAnimation:
        | null
        | 'undock'
        | 'dock'
        | 'appear'
        | 'sit'
        | 'disappear' = null;
      if (props.prevState === 'neutral' && props.curState === 'undocked') {
        targetAnimation = 'undock';
      } else if (props.prevState === 'neutral' && props.curState === 'docked') {
        targetAnimation = 'appear';
        // eslint-disable-next-line prettier/prettier
      } else if (props.prevState === 'undocked' && props.curState === 'docked') {
        targetAnimation = 'sit';
      } else if (props.prevState === 'docked' && props.curState === 'docked') {
        targetAnimation = 'dock';
      }
      if (targetAnimation) {
        animation[targetAnimation]();
      }
    }
  }, [animation, props.curState, props.isBase, props.prevState]);
  console.log(props.data);

  return <View>{props.isBase ? renderBase() : renderBlocks()}</View>;
};

export default BlockStack;
