import React from 'react'
import { View, Text, Image, ImageStyle, ViewStyle, StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import NativeRefBox from './NativeRefBox';
import Chat from './Profile/Chat';

type ProfileProps = {
  photoUri?: string;
  style?: ViewStyle;
  iconColor?: string;
}

type ProfileState = {
  expression?: JSX.Element;
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  }
})

class Profile extends React.Component<ProfileProps, ProfileState> {
  boxRef = React.createRef<NativeRefBox>();
  chatBubbleRef = React.createRef<Chat>();
  timeout: NodeJS.Timeout | null = null;
  isAnimating = false;

  constructor(props: Readonly<ProfileProps>) {
    super(props);
    this.state = {
      expression: <></>
    }

    this.express = this.express.bind(this);
    this.renderPhoto = this.renderPhoto.bind(this);
  }

  express(
    expression: JSX.Element,
    direction: "topRight" | "topLeft" | "bottomRight" | "bottomLeft" = "topLeft",
    offset: number = 50,
  ) {
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
        left: -offset,
        top: -offset,
      },
      bottomLeft: {
        left: -offset,
        top: offset,
      },
      topRight: {
        left: offset,
        top: -offset,
      },
      bottomRight: {
        left: offset,
        top: offset,
      },
    }[direction];

    this.setState({
      expression
    });

    this.boxRef.current?.setStyle({
      left: 0,
      top: 0,
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
            left: 0,
            top: 0,
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
    if (props.photoUri) {
      return (
        <Image style={{width: '100%', height: '100%'}} source={{ uri: photoUri }}/>
      )
    } else {
      return (
        <Icon name="user" size={20} color={props.iconColor || "black"} />
      )
    }
  }

  render() {
    const { props, state } = this;
    const { boxRef, chatBubbleRef } = this;
    const { style, photoUri } = props;
    return (
      <View
        style={
          photoUri
          ? {
              ...style,
              justifyContent: 'center',
              alignItems: 'center',
            }
          : styles.iconContainer
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
          <Chat ref={chatBubbleRef} width={50} height={50}>
            {state.expression}
          </Chat>
        </NativeRefBox>
      </View>
    )
  }
}

export default Profile
