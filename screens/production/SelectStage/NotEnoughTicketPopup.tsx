import React from 'react'
import { View, Text, Modal } from 'react-native'
import chroma from 'chroma-js'
import usePopup from '../../../hooks/usePopup'
import Flickery from '../../../components/Flickery'
import { RoundPaddingCenter, NotoSans } from '../../../components/Generic/StyledComponents'

const NotEnoughTicketPopup = () => {
  const popup = usePopup();
  const flickerRef = React.createRef<Flickery>();
  React.useEffect(() => {
    flickerRef.current?.flickerNTimes(3);
    setTimeout(popup.hide, 1500);
  })
  return (
    <Modal onRequestClose={popup.hide} transparent>
      <View style={{flex: 1, backgroundColor: chroma('red').alpha(0.5).hex(), justifyContent: 'center'}}>
        <Flickery ref={flickerRef}>
          <RoundPaddingCenter>
            <NotoSans type="Black" size={20}>티켓이 없습니다</NotoSans>
          </RoundPaddingCenter>
        </Flickery>
      </View>
    </Modal>
  )
}

export default NotEnoughTicketPopup
