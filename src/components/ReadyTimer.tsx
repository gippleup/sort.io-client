import React, { Component, RefObject } from 'react'
import { Text, View, Dimensions } from 'react-native'
import StrokedText from './StrokedText'
import NativeRefBox from './NativeRefBox';

type ReadyTimerProps = {
  initialText?: string;
  duration: number;
  isManual?: boolean;
  onZero?: () => any;
  onDisappear?: () => any;
  onInitialTextDisappear?: () => any;
  onCount?: (leftTime: number) => any;
}

type ReadyTimerState = {
  leftTime: number;
  text: string;
}

export class ReadyTimer extends Component<ReadyTimerProps, ReadyTimerState> {
  refBox: RefObject<NativeRefBox> = React.createRef();
  timer: NodeJS.Timer | null = null;
  initialTextDisappeared = false;

  constructor(props: Readonly<ReadyTimerProps>) {
    super(props);    
    this.state = {
      leftTime: props.duration + 1,
      text: '',
    }

    this.appear = this.appear.bind(this);
    this.setLeftTime = this.setLeftTime.bind(this);
    this.countBy1 = this.countBy1.bind(this);
  }
  
  appear(onFinished?: () => any) {
    this.refBox.current?.setStyle({
      opacity: 0,
      scaleX: 3,
      scaleY: 3,
    })
    return this.refBox.current?.animate({
      style: {
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
      },
      duration: 1000,
      easing: "easeOutElastic",
      fps: 60
    }).start(onFinished);
  }

  setLeftTime(leftTime: number) {
    this.initialTextDisappeared = true;
    this.setState({leftTime})
  }

  setText(text: string) {
    this.setState({text});
  }

  disappear(onFinished?: () => any) {
    this.refBox.current?.animate({
      style: {
        opacity: 0,
      },
      easing: "easeInOutSine",
      duration: 1000,
    }).start(onFinished);
  }

  countBy1() {
    const {state, props} = this;
    const { leftTime } = state;
    if (leftTime > 0) {
      this.setState({
        leftTime: leftTime - 1,
      })
    } else {
      if (props.onZero) {
        props.onZero();
      }
      this.disappear(props.onDisappear);
      if (this.timer !== null) {
        clearInterval(this.timer);
      }
    }
  }

  componentDidMount() {
    const {props, state} = this;
    const {countBy1} = this;
    const {initialTextDisappeared} = this;
    const startCountDown = () => {
      if (!props.isManual) {
        this.timer = setInterval(() => {
          countBy1();
        }, 1000)
      }
    }

    this.appear(() => {
      if (props.initialText && !initialTextDisappeared) {
        this.disappear(() => {
          if (props.onInitialTextDisappear) {
            props.onInitialTextDisappear();
          }
          this.initialTextDisappeared = true;
          startCountDown();
        })
      } else {
        startCountDown();
      }
    });
  }

  componentDidUpdate() {
    const {props} = this;
    if (props.onCount) {
      props.onCount(this.state.leftTime);
    }
    this.appear();
  }
  
  componentWillUnmount() {
    if (this.timer !== null) {
      clearInterval(this.timer)
    }
  }

  render() {
    const {state, props} = this;
    const {refBox, initialTextDisappeared} = this;
    let textToRender;
    if (props.initialText && !initialTextDisappeared) {
      textToRender = props.initialText;
    } else {
      textToRender = state.text || String(state.leftTime);
    }
    return (
      <View>
        <NativeRefBox ref={refBox}
          style={{opacity: 0}}
        >
          <StrokedText
            dyMultiplier={0.33}
            fillColor="black"
            fontFamily="NotoSansKR-Black"
            fontSize={50}
            height={150}
            strokeColor="white"
            strokeWidth={10}
            text={textToRender || ''}
            width={Dimensions.get('window').width}
          />
        </NativeRefBox>
      </View>
    )
  }
}

export default ReadyTimer
