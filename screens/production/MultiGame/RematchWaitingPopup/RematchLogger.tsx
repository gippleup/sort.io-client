import React, { ForwardRefRenderFunction, RefObject } from 'react'
import { View, Text, Dimensions } from 'react-native'
import Logger from '../../../../components/Logger';
import { NotoSans } from '../../../../components/Generic/StyledComponents';
import usePlayData from '../../../../hooks/usePlayData';
import GradientBlindScrollView from '../../../../components/GradientBlindScrollView';
import chroma from 'chroma-js';

export type RematchMessage = {
  text: string,
  ownerId: number
}

const RematchLogger = React.forwardRef<Logger>((props, ref) => {
  const playData = usePlayData();
  const userId = playData.user.id;
  const blindScrollRef = React.createRef<GradientBlindScrollView>();

  return (
    <GradientBlindScrollView
      ref={blindScrollRef}
      blindColor="white"
      blindHeight={40}
      style={{
        height: 90,
        width: Dimensions.get('window').width - 100,
        maxWidth: 250,
        paddingHorizontal: 10,
      }}
    >
      <Logger
        ref={ref}
        onAddMessage={() => {
          blindScrollRef.current?._scrollViewRef.current?.scrollToEnd();
        }}
        messageRenderer={(data: RematchMessage, i) => {
          let color;
          if (data.ownerId === userId) {
            color = 'limegreen';
          } else if (data.ownerId === -1) {
            color = 'grey';
          } else {
            color = 'tomato';
          }

          return (
            <View key={i} style={{ justifyContent: data.ownerId === -1 ? 'center' : 'flex-start' }}>
              <NotoSans
                type="Black"
                size={13}
                color={color}
              >
                ▶ {data.text}
              </NotoSans>
            </View>
          )
        }}
      />
    </GradientBlindScrollView>
  )
})

export default RematchLogger
