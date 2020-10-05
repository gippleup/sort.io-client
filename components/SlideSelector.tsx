import MaskedView from '@react-native-community/masked-view';
import { axisRight } from 'd3';
import React, { Fragment, RefObject } from 'react'
import { View, Text, ViewStyle, findNodeHandle, LayoutRectangle } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { getIcon, IconContainer } from '../api/icon';
import { FlexHorizontal, Space } from './Generic/StyledComponents';
import Arrow from './SliderSelector/Arrow';
import { ArrowSelectorContainer, DirectionAligner } from './SliderSelector/_StyledComponents';

type SlideSelectorProps<T> = {
  data: T[];
  entryRenderer: (data: T, selected: boolean) => JSX.Element;
  direction?: "vertical" | "horizontal";
  onChange?: (data: T) => any;
  entryContainerStyle?: ViewStyle;
  interval?: number;
  size?: number;
  arrowColor?: string;
  initialCursor?: number;
  style?: ViewStyle;
}

const SlideSelector: React.FC<SlideSelectorProps<any>> = (props) => {
  const {
    data,
    entryRenderer,
    direction = "vertical",
    onChange,
    entryContainerStyle,
    interval = 0,
    size = 100,
    arrowColor,
    initialCursor = 0,
  } = props;
  const isHorizontal = direction === "horizontal";
  const [cursor, setCursor] = React.useState(initialCursor);
  const scrollRef = React.useRef<ScrollView>(null);
  const viewRefs = React.useRef<RefObject<View>[]>(data.map((_) => React.useRef<View>(null)));

  const selectPrev = () => setCursor(cursor <= 0 ? data.length - 1 : cursor - 1);
  const selectNext = () => setCursor(cursor >= data.length - 1 ? 0 : cursor + 1);
  const measureEntryPosition = (callback: (layout: LayoutRectangle) => any) => {
    const scrollRefId = scrollRef.current ? findNodeHandle(scrollRef.current) : null;
    if (scrollRefId) {
      viewRefs.current[cursor].current?.measureLayout(scrollRefId, (...args) => {
        const {0: left, 1: top, 2: width, 3: height} = args;
        callback({height, width, x: left, y: top});
      }, () => console.log('failed to measure layout'))
    }
  }

  React.useEffect(() => {
    if (onChange) {
      onChange(data[cursor]);
    }

    measureEntryPosition((layout) => {
      const targetDimension = isHorizontal ? "x" : "y";
      scrollRef.current?.scrollTo({
        [targetDimension]: layout[targetDimension]
      });
      // scrollRef.current?.scrollToEnd();
    })
  }, [cursor])

  return (
    <ArrowSelectorContainer style={props.style} isHorizontal={isHorizontal}>
      <Arrow
        isHorizontal={isHorizontal}
        direction={"prev"}
        onPress={selectPrev}
        color={arrowColor}
      />
      <ScrollView
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={isHorizontal ? true : false} ref={scrollRef}
        style={{
          ...entryContainerStyle,
          [direction==="horizontal" ? "width" : "height"]: size
        }}
      >
        <FlexHorizontal>
          <DirectionAligner isHorizontal={isHorizontal}>
            {data.map((entry, i) => {
              const selected = i === cursor;
              const renderInterval = () => {
                if (i >= data.length - 1) return <></>;
                return (
                  <Space {...{
                    [isHorizontal ? "width" : "height"]: interval
                  }}/>
                )
              }
              return (
                <Fragment key={i}>
                  <View ref={viewRefs.current[i]}>
                    {entryRenderer(entry, selected)}
                  </View>
                  {renderInterval()}
                </Fragment>
              )
            })}
          </DirectionAligner>
        </FlexHorizontal>
      </ScrollView>
      <Arrow isHorizontal={isHorizontal} direction={"next"} onPress={selectNext} />
    </ArrowSelectorContainer>
  )
}

export default SlideSelector
