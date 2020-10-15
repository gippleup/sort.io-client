import React from 'react'
import { View, Text, Image, ImageStyle, ViewStyle, StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import NativeRefBox from './NativeRefBox';
import Chat from './Profile/Chat';

type ProfileProps = {
  photoUri?: string;
  size?: number;
  iconColor?: string;
  chatBubbleSize?: number;
}

type ProfileState = {
  expression?: JSX.Element;
}

class Profile extends React.Component<ProfileProps, ProfileState> {
  boxRef = React.createRef<NativeRefBox>();
  chatBubbleRef = React.createRef<Chat>();
  timeout: NodeJS.Timeout | null = null;
  isAnimating = false;
  size = 40;
  chatBubbleSize = this.props.chatBubbleSize || 50;
  bubbleOffsetDiff = Math.abs((this.chatBubbleSize - this.size) / 2);

  constructor(props: Readonly<ProfileProps>) {
    super(props);
    this.state = {
      expression: <></>
    }
    this.size = this.props.size || 40;
    this.express = this.express.bind(this);
    this.renderPhoto = this.renderPhoto.bind(this);
  }

  express(
    expression: JSX.Element,
    direction: "topRight" | "topLeft" | "bottomRight" | "bottomLeft" = "topLeft",
    offset: number = 50,
  ) {
    const {bubbleOffsetDiff, size, chatBubbleSize} = this;
    const offsetForCenter = size > chatBubbleSize ? bubbleOffsetDiff : -bubbleOffsetDiff;

    if (this.timeout !== null) return;
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.chatBubbleRef.current?.setState({
      mirror: {
        topLeft: true,
        topRight: false,
        bottomLeft: true,
        bottomRight: false,
      }[direction],
      flip: {
        topLeft: false,
        topRight: false,
        bottomLeft: true,
        bottomRight: true,
      }[direction]
    })
    const animationConfig = {
      topLeft: {
        left: offsetForCenter-offset,
        top: offsetForCenter-offset,
      },
      bottomLeft: {
        left: offsetForCenter-offset,
        top: offsetForCenter+offset,
      },
      topRight: {
        left: offsetForCenter+offset,
        top: offsetForCenter-offset,
      },
      bottomRight: {
        left: offsetForCenter+offset,
        top: offsetForCenter+offset,
      },
    }[direction];

    this.setState({
      expression
    });

    this.boxRef.current?.setStyle({
      left: offsetForCenter,
      top: offsetForCenter,
      scaleX: 0,
      scaleY: 0,
    })

    this.boxRef.current?.animate({
      style: {
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
        ...animationConfig,
      },
      duration: 1000,
      easing: "easeOutElastic"
    }).start(() => {
      this.timeout = setTimeout(() => {
        this.boxRef.current?.animate({
          style: {
            opacity: 0,
            scaleX: 0,
            scaleY: 0,
            left: offsetForCenter,
            top: offsetForCenter,
          },
          duration: 300,
          easing: "easeInOutSine"
        }).start(() => {
          this.timeout = null;
          this.isAnimating = false;
        })
      }, 1000)
    })
  }

  renderPhoto() {
    const {props} = this;
    const {photoUri} = props;
    const {size} = this;
    const sizeConsideringBackground = 20 * (size / 40);
    if (props.photoUri) {
      return (
        <Image
          style={props.size 
          ? {width: size, height: size} 
          : {width: '100%', height: '100%'}}
          source={{ uri: photoUri }}
        />
      )
    } else {
      return (
        <Icon
          name="user"
          size={sizeConsideringBackground}
          color={props.iconColor || "black"}
        />
      )
    }
  }

  render() {
    const { props, state } = this;
    const { boxRef, chatBubbleRef } = this;
    const { photoUri } = props;
    const { size, chatBubbleSize } = this;
    return (
      <View
        style={
          photoUri
          ? {
              justifyContent: 'center',
              alignItems: 'center',
              width: size,
              height: size
            }
            : {
              width: size,
              height: size,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: 200,
            }
        }
      >
        {this.renderPhoto()}
        <NativeRefBox
          ref={boxRef}
          style={{
            position: 'absolute',
            opacity: 0,
          }}
        >
          <Chat
            ref={chatBubbleRef}
            width={chatBubbleSize}
            height={chatBubbleSize}
            fill="ivory"
            stroke="rgba(0,0,0,0.3)"
          >
            {state.expression}
          </Chat>
        </NativeRefBox>
      </View>
    )
  }
}

export default Profile
