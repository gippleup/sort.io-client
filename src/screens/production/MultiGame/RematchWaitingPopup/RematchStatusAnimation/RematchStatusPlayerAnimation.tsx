import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import CommentBox from '../CommentBox';
import Icon from 'react-native-vector-icons/FontAwesome';
import NativeRefBox from '../../../../../components/NativeRefBox';
import { FlexHorizontal } from '../../../../../components/Generic/StyledComponents';
import LoadingWave from '../../../../../components/LoadingWave';

type RematchStatusPlayerAnimationProps = {
  type: 'opponent' | 'player';
}

type RematchStatusPlayerAnimationState = {
  message: JSX.Element | null;
}

export class RematchStatusPlayerAnimation extends Component<RematchStatusPlayerAnimationProps, RematchStatusPlayerAnimationState> {
  commentBoxRef = React.createRef<NativeRefBox>();
  messageRef = React.createRef<NativeRefBox>();
  waveRef = React.createRef<LoadingWave>();
  color = "limegreen";
  isPlayer = true;

  constructor(props: Readonly<RematchStatusPlayerAnimationProps>) {
    super(props);
    this.isPlayer = props.type === "player";
    this.color = this.isPlayer ? "limegreen" : "tomato";

    this.state = {
      message: null,
    }

    this.askRematch = this.askRematch.bind(this);
    this.agreeRematch = this.agreeRematch.bind(this);
    this.disagreeRematch = this.disagreeRematch.bind(this);
    this.think = this.think.bind(this);
    this.popMessage = this.popMessage.bind(this);
    this.popCommentBox = this.popCommentBox.bind(this);
    this.startWave = this.startWave.bind(this);
    this.stopWave = this.stopWave.bind(this);
  }

  askRematch() {
    const { color } = this;
    this.setState({
      message: (
        <>
          <Icon name="hand-rock-o" size={30} color={color} style={{ marginRight: 5 }} />
          <Icon name="question" size={20} color={color} />
        </>
      )
    })
  }

  agreeRematch() {
    const { color } = this;
    this.setState({
      message: (
        <>
          <Icon name="hand-rock-o" size={30} color={color} style={{ marginRight: 5 }} />
          <Icon name="exclamation" size={20} color={color} />
        </>
      )
    })
  }

  disagreeRematch() {
    const { color } = this;
    this.setState({
      message: (
        <>
          <Icon name="close" size={30} color={color} style={{ marginRight: 5 }} />
          <Icon name="exclamation" size={20} color={color} />
        </>
      )
    })
  }

  think() {
    const { color } = this;
    this.setState({
      message: (
        <FlexHorizontal style={{paddingTop: 0, paddingLeft: 5}}>
          <LoadingWave
            particleCount={3}
            halfDuration={1000}
            amplitude={1}
            particleRenderer={(i) => (
              <View
                style={{
                  width: 5,
                  height: 5,
                  marginRight: 5,
                  backgroundColor: color,
                }}
              />
            )}
          />
        </FlexHorizontal>
      )
    })
  }

  popMessage(onComplete?: () => any) {
    const {messageRef} = this;
    messageRef.current?.setScale(0);
    messageRef.current?.animate({
      style: {
        scaleX: 1,
        scaleY: 1,
      },
      duration: 1000,
      easing: "easeOutElastic"
    }).start(onComplete);
  }

  popCommentBox(onComplete?: () => any) {
    const {commentBoxRef} = this;
    commentBoxRef.current?.setScale(0.8);
    commentBoxRef.current?.animate({
      style: {
        scaleX: 1,
        scaleY: 1,
      },
      duration: 1000,
      easing: "easeOutElastic"
    }).start(onComplete);
  }

  startWave() {
    this.waveRef.current?.startWave();
  }

  stopWave() {
    this.waveRef.current?.stopWave();
  }

  componentDidMount() {
    const {props} = this;
  }

  render() {
    const { color, isPlayer } = this;
    const { commentBoxRef, messageRef, waveRef } = this;
    const { props, state } = this;
    return (
      <View>
        <LoadingWave
          isManual
          ref={waveRef}
          particleCount={1}
          halfDuration={1000}
          particleRenderer={(i) => (
            <NativeRefBox ref={commentBoxRef}>
              <CommentBox mirror={!isPlayer} color={color} size={70} style={{ marginLeft: isPlayer ? 20 : -30 }}>
                <NativeRefBox
                  ref={messageRef}
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  {state.message}
                </NativeRefBox>
              </CommentBox>
            </NativeRefBox>
          )}        
        />
        <Icon name="user" size={80} color={color} />
      </View>
    )
  }
}

export default RematchStatusPlayerAnimation
