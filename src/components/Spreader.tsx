import React, { RefObject } from 'react'
import { View, Text, LayoutRectangle, Animated, LayoutChangeEvent, ViewStyle, InteractionManager } from 'react-native'
import NativeRefBox from './NativeRefBox';
import { Easings } from './NativeRefBox/easings';

type SpreaderProps = {
  spread?: boolean;
  foldDuration?: number;
  unfoldDuration?: number;
  unfoldEasing?: Easings;
  foldEasing?: Easings;
}

class Spreader extends React.Component<SpreaderProps>{
  layout: LayoutRectangle | null = null;
  boxRef: RefObject<NativeRefBox> = React.createRef();
  folded: boolean;
  constructor(props: Readonly<SpreaderProps>) {
    super(props);
    this.folded = props.spread ? false : true;
    this.captureLayout = this.captureLayout.bind(this);
    this.setSpread = this.setSpread.bind(this);
  }

  captureLayout(e: LayoutChangeEvent) {
    const {boxRef, folded} = this;
    if (this.layout) return;
    boxRef.current?.setStyle({height: 0});
    this.layout = e.nativeEvent.layout;

    if (!folded) {
      this.setSpread("unfold");
    }
  }

  setSpread(status: "fold" | "unfold", callback?: () => any) {
    const {boxRef, layout} = this;
    const {props} = this;
    const {
      foldEasing = "easeOutSine",
      unfoldEasing = "easeOutSine",
      foldDuration = 100,
      unfoldDuration = 300,
    } = props;
    this.folded = status === "fold" ? true : false;

    boxRef.current?.setStyle({display: "flex"})

    boxRef.current?.animate({
      style: {
        height: status === "unfold" ? layout?.height : 0,
        opacity: status === "unfold" ? 1 : 0,
      },
      easing: status === "unfold" ? unfoldEasing : foldEasing,
      duration: status === "unfold" ? unfoldDuration : foldDuration,
      fps: 60,
    }).start(callback);
  }

  toggle() {
    if (this.folded) {
      this.setSpread("unfold")
    } else {
      this.setSpread("fold");
    }
  }

  componentDidUpdate() {
    const {layout, setSpread, props} = this;
    const {spread} = props;
    if (layout) {
      spread ? setSpread("unfold") : setSpread("fold");
    }
  }

  render() {
    const {boxRef, props, captureLayout} = this;

    return (
      <NativeRefBox
        ref={boxRef}
        onLayout={captureLayout}
        style={{overflow: "hidden", opacity: 0}}
      >
        {props.children}
      </NativeRefBox>
    )
  }
}

export default Spreader
