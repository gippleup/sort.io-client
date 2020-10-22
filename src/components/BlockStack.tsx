import React from 'react';
import {View, Animated, Easing, ViewProps} from 'react-native';
import {TBlock} from './BlockBoard/Model/model';
import styled from 'styled-components';
import Block from './Block';
import skinMap, {SupportedSkin} from './Block/skinMap';
import BlockFrame from './BlockStack/BlockFrame';

const StackContainer: typeof View = styled(View)`
  justify-content: flex-end;
`;

const BlockContainer: typeof View = styled(View)``;

const BlockStackContainer: typeof View = styled(View)`
  width: 100%;
  position: absolute;
`;

const TouchAgent: typeof View = styled(View)`
  position: absolute;
  background-color: black;
  opacity: 0;
`;

type BlockStackProps = {
  data: TBlock[];
  max: number;
  completed: boolean;
  onTouchStart?: () => void;
  curState: 'neutral' | 'docked' | 'undocked';
  prevState: 'neutral' | 'docked' | 'undocked';
  skin: SupportedSkin;
  scale: number;
};

class BlockStack extends React.Component<BlockStackProps, {}> {
  dockAnim: Animated.Value;
  scaleAnim: Animated.Value;
  topBlock: TBlock;
  bodyBlocks: TBlock[];
  tailBlock: TBlock;
  constructor(props: BlockStackProps) {
    super(props);
    this.dockAnim = new Animated.Value(0);
    this.scaleAnim = new Animated.Value(1);
    this.topBlock = props.data[props.data.length - 1];
    this.bodyBlocks = props.data.slice(0, props.data.length - 1);
    this.tailBlock = this.bodyBlocks[0] || this.topBlock;

    this.appear = this.appear.bind(this);
    this.disappear = this.disappear.bind(this);
    this.dock = this.dock.bind(this);
    this.undock = this.undock.bind(this);
    this.sit = this.sit.bind(this);
    this.renderBlocks = this.renderBlocks.bind(this);
    this.renderCap = this.renderCap.bind(this);
  }
  shouldComponentUpdate(nextProps: BlockStackProps) {
    const {props} = this;
    if (
      nextProps.data.length === props.data.length &&
      nextProps.curState === props.curState
    ) {
      return false;
    }
    return true;
  }
  componentDidUpdate() {
    const {props} = this;

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
      this[targetAnimation]();
    }
  }
  dock() {
    this.dockAnim.stopAnimation();
    Animated.timing(this.dockAnim, {
      toValue: 0,
      useNativeDriver: true,
      duration: 300,
      easing: Easing.in(Easing.bounce),
    }).start();
  }
  undock() {
    this.dockAnim.stopAnimation();
    Animated.timing(this.dockAnim, {
      toValue: 1,
      useNativeDriver: true,
      duration: 300,
      easing: Easing.in(Easing.elastic(4)),
    }).start();
  }
  disappear() {
    this.scaleAnim.stopAnimation();
    this.scaleAnim.setValue(1);
    Animated.timing(this.scaleAnim, {
      toValue: 0,
      useNativeDriver: true,
      duration: 100,
      easing: Easing.in(Easing.ease),
    }).start();
  }
  appear() {
    this.dockAnim.stopAnimation();
    this.scaleAnim.stopAnimation();
    this.dockAnim.setValue(1);
    this.scaleAnim.setValue(0);
    Animated.timing(this.scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      duration: 100,
      easing: Easing.in(Easing.cubic),
    }).start(this.dock);
  }
  sit() {
    this.dockAnim.stopAnimation();
    this.dockAnim.setValue(0);
  }
  renderCap() {
    const {props} = this;
    if (!props.completed) {
      return <></>;
    }
    return (
      <Block
        type={this.tailBlock.type}
        skin={props.skin}
        part="top"
        scale={props.scale}
      />
    );
  }
  renderBlocks() {
    const {props} = this;
    if (!this.topBlock) {
      return (
        <BlockContainer>
          <Block
            type={9}
            skin={props.skin}
            part="bottom"
            scale={props.scale}
          />
        </BlockContainer>
      );
    }

    return (
      <BlockContainer>
        {this.renderCap()}
        <Animated.View
          style={{
            transform: [
              {
                translateY: this.dockAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -40],
                }),
              },
              {
                scale: this.scaleAnim,
              },
            ],
          }}>
          <Block
            type={this.topBlock.type}
            skin={props.skin}
            part="piece"
            scale={props.scale}
          />
        </Animated.View>
        {this.bodyBlocks
          .slice(0)
          .reverse()
          .map((block, i) => (
            <Block
              key={i}
              type={block.type}
              skin={props.skin}
              part="piece"
              scale={props.scale}
            />
          ))}
        <Block
          type={this.tailBlock.type}
          skin={props.skin}
          part="bottom"
          scale={props.scale}
        />
      </BlockContainer>
    );
  }
  render() {
    const {props, renderBlocks} = this;
    this.topBlock = props.data[props.data.length - 1];
    this.bodyBlocks = props.data.slice(0, props.data.length - 1);
    this.tailBlock = this.bodyBlocks[0] || this.topBlock;
    return (
      <StackContainer>
        <BlockFrame pieceCount={props.max} scale={props.scale} />
        <BlockStackContainer>{renderBlocks()}</BlockStackContainer>
        <TouchAgent onTouchStart={props.onTouchStart}>
          <BlockFrame pieceCount={5} scale={props.scale} />
        </TouchAgent>
      </StackContainer>
    );
  }
}

export default BlockStack;
