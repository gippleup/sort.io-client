import React, { ForwardRefRenderFunction, RefObject } from 'react'
import { View, Text } from 'react-native'
import Logger from '../../../../components/Logger';
import { NotoSans } from '../../../../components/Generic/StyledComponents';
import usePlayData from '../../../../hooks/usePlayData';

export type RematchMessage = {
  text: string,
  ownerId: number
}

const RematchLogger = React.forwardRef<Logger>((props, ref) => {
  const playData = usePlayData();
  const userId = playData.user.id;

  return (
    <View
      style={{
        alignItems: 'center',
        margin: 20,
        marginTop: 0,
      }}
    >
      <Logger
        ref={ref}
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
            <View key={i} style={{ alignItems: data.ownerId === -1 ? 'center' : 'flex-start' }}>
              <NotoSans
                type="Black"
                color={color}
              >
                {data.text}
              </NotoSans>
            </View>
          )
        }}
      />
    </View>
  )
})

export default RematchLogger
