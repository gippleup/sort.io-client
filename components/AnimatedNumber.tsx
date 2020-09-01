import React from 'react'
import { View, Text, TextStyle, Animated, Easing } from 'react-native'
import { FlexHorizontal } from './Generic/StyledComponents';
import { TextInput } from 'react-native-gesture-handler';

type AnimatedNumberProps = {
  value: number;
  style?: TextStyle;
  animationType?: "slide" | "instant" | "rain";
}

type AnimatedNumberState = {
  prevNumToRender: number;
  numToRender: number;
  appeared: boolean;
  disappeared: boolean;
}

class AnimatedNumber extends React.Component<AnimatedNumberProps, AnimatedNumberState> {
  constructor(props: Readonly<AnimatedNumberProps>) {
    super(props);
    this.state = {
      prevNumToRender: props.value,
      numToRender: props.value,
      appeared: true,
      disappeared: false,
    }
    this.renderNumber = this.renderNumber.bind(this);
    this.renderNumberSlideAnim = this.renderNumberSlideAnim.bind(this);
    this.renderNumberInstantAnim = this.renderNumberInstantAnim.bind(this);
  }

  anims: Animated.Value[] = [];
  instantAnim = new Animated.Value(0);
  textInputRef = React.createRef<TextInput>();

  get appear() {
    this.anims.forEach((anim) => anim.setValue(1))
    return Animated.stagger(100 / this.anims.length, this.anims.map((anim) => {
      return Animated.timing(anim, {
        toValue: 0,
        duration: 300,
        easing: Easing.elastic(3),
        useNativeDriver: true,
      })
    }))
  }

  get disappear() {
    this.anims.forEach((anim) => anim.setValue(0));
    return Animated.stagger(1000 / this.anims.length, this.anims.map((anim) => {
      return Animated.timing(anim, {
        toValue: 1,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      })
    }))
  }

  componentDidMount() {
    const {props} = this;
    if (props.animationType === "rain") {
      this.instantAnim.addListener((state) => {
        const $ = this.textInputRef.current;
        const roundedValue = Math.round(state.value);
        //@ts-ignore
        $?.setNativeProps({
          text: String(roundedValue),
        })
      })
      this.instantAnim.setValue(props.value);
    }
  }

  componentWillUnmount() {
    this.appear.stop();
    this.instantAnim.stopAnimation();
  }

  componentDidUpdate() {
    if (this.state.numToRender !== this.props.value) {
      this.setState({
        numToRender: this.props.value,
        prevNumToRender: this.state.numToRender,
        appeared: false,
      })
    } else if (!this.state.appeared) {
      if (this.props.animationType === "rain") {
        const valueDiff = this.state.numToRender - this.state.prevNumToRender;
        const duration = Math.log(Math.abs(valueDiff)) * 100;
        Animated.timing(this.instantAnim, {
          toValue: this.state.numToRender,
          duration: Math.max(duration, 2000),
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }).start(() => {
          this.setState({
            appeared: true,
          })
        });
      } else {
        this.appear.start(() => {
          this.setState({
            appeared: true,
          })
        })
      }
    }
  }

  renderNumberSlideAnim() {
    const {props, state} = this;
    const {numToRender, prevNumToRender} = state;
    const numArr = numToRender.toString().split('');
    const prevNumArr = prevNumToRender.toString().split('')
    this.anims = [];
    return numArr.map((num, i) => {
      if (prevNumArr[i] !== num) {
        const slideAnim = new Animated.Value(0);
        const translateY = slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -30]
        });
        const opacity = slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0]
        });
        this.anims.push(slideAnim);
        return (
          <Animated.View key={i} style={{ translateY, opacity }}>
            <Text style={props.style}>{num}</Text>
          </Animated.View>
        )
      } else {
        return (
          <Text style={props.style}>{num}</Text>
        )
      }
    })
  }

  renderNumberInstantAnim() {
    const {props, state} = this;
    return <TextInput editable={false} ref={this.textInputRef} style={props.style} />
  }

  renderNumber(animationType: "slide" | "instant" | "rain") {
    if (animationType === "slide") {
      return this.renderNumberSlideAnim();
    } else if (animationType === "rain") {
      return this.renderNumberInstantAnim();
    } else {
      return (
        <Text style={this.props.style}>
          {this.props.value}
        </Text>
      )
    }
  }

  render() {
    const {props} = this;
    const { renderNumber } = this;
    const animationType = props.animationType || "rain"
    return (
      <FlexHorizontal>
        {renderNumber(animationType)}
      </FlexHorizontal>
    )
  }
}

export default AnimatedNumber
