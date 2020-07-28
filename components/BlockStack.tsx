import React from 'react';
import {View, Animated, Easing} from 'react-native';
import {TBlock} from './BlockBoard/Model/model';
import PieceBase from './Block/PieceBase';
import BottomBase from './Block/BottomBase';
import TopBase from './Block/TopBase';
import styled from 'styled-components';
import Block from './Block';
import skinMap, {skins} from './BlockStack/skinMap';

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
  skin: skins;
};

let count = 0;
const BlockStack: React.FC<BlockStackProps> = (props) => {
  React.useEffect(() => {
    count++;
    console.log(count);
  }, [props.data]);
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

  const topBlock = props.data[props.data.length - 1];
  const bodyBlocks = props.data.slice(0, props.data.length - 1);
  const tailBlock = bodyBlocks[0] || topBlock;

  const renderCap = () => {
    if (!props.completed) {
      return <></>;
    }
    return (
      <Block
        type={tailBlock.type}
        shape={skinMap[props.skin].top}
        base={TopBase}
      />
    );
  };

  const renderBase = () => {
    return (
      <BaseContainer
        onTouchStart={() => {
          if (props.onPress) {
            props.onPress();
          }
        }}>
        <TopBase type={9} />
        {Array(props.max)
          .fill(0)
          .map((value, i) => (
            <PieceBase key={i} type={9} />
          ))}
        <BottomBase type={9} />
      </BaseContainer>
    );
  };

  const renderBlocks = () => {
    if (!topBlock) {
      return (
        <BlockContainer>
          <Block
            type={9}
            shape={skinMap[props.skin].bottom}
            base={BottomBase}
          />
        </BlockContainer>
      );
    }

    return (
      <BlockContainer>
        {renderCap()}
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
          <Block
            type={topBlock.type}
            shape={skinMap[props.skin].piece}
            base={PieceBase}
          />
        </Animated.View>
        {bodyBlocks
          .slice(0)
          .reverse()
          .map((block, i) => (
            <Block
              key={i}
              type={block.type}
              shape={skinMap[props.skin].piece}
              base={PieceBase}
            />
          ))}
        <Block
          type={tailBlock.type}
          shape={skinMap[props.skin].bottom}
          base={BottomBase}
        />
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

  return <View>{props.isBase ? renderBase() : renderBlocks()}</View>;
};

BlockStack.defaultProps = {
  skin: 'basic',
};

export default BlockStack;
