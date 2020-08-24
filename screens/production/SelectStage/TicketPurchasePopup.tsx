import React from 'react'
import { View, TouchableOpacity, Modal } from 'react-native'
import BasicPopup, { PopupButton } from '../../../components/Generic/BasicPopup'
import { TicketIcon } from './_StyledComponents'
import styled from 'styled-components'
import { NotoSans, FlexHorizontal, Space, Circle, RoundPaddingCenter } from '../../../components/Generic/StyledComponents'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import MoneyIcon from '../../../components/Main/MoneyIcon'
import usePopup from '../../../hooks/usePopup'
import usePlayData from '../../../hooks/usePlayData'
import { saveTicket, useGold } from '../../../api/local'
import chroma from 'chroma-js'
import Flickery from '../../../components/Flickery'

const ItemIconContainer = styled(View)`
  border-radius: 10px;
  background-color: dodgerblue;
  border-width: 0.5px;
  border-color: yellow;
`;

const PurchaseQuantity: typeof NotoSans = styled(NotoSans)`
  background-color: lightgrey;
  padding-left: 5px;
  padding-right: 5px;
  text-align: right;
  width: 50px;
`

const AlertContainer = styled(View)`
  flex: 1;
  background-color: ${chroma('red').alpha(0.5).hex()};
  justify-content: center;
`;

const RequiredMoneyDesc = styled(View)`
  background-color: white;
  align-self: center;
  padding: 15px;
  margin-top: 10px;
  border-radius: 20px;
`;

const RequiredMoney:typeof NotoSans = styled(NotoSans)`
  color: tomato;
  border-top-width: 0.5px;
  padding-top: 5px;
  margin-top: 5px;
`;

const TicketPurchasePopup = () => {
  const ticketPrice = 150;
  const [quantity, setQuantity] = React.useState(0);
  const increaseQuantity = () => setQuantity(Math.max(quantity - 1, 0));
  const decreaseQuantity = () => setQuantity(quantity + 1);
  const playData = usePlayData();
  const popup = usePopup();
  const [alertVisible, setAlertVisible] = React.useState(false);
  const flickerRef = React.createRef<Flickery>();
  
  const purchaseTicket = () => {
    if (quantity === 0) return;
    if (playData.user.gold >= ticketPrice * quantity) {
      useGold(ticketPrice * quantity).then(() => {
        saveTicket(quantity).then(popup.hide);
      })
    } else {
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 1500)
    }
  }

  const buttons: PopupButton[] = [
    {
      text: '구매하기',
      onPress: purchaseTicket,
    },
    {
      text: '취소하기',
      onPress: popup.hide,
    },
  ]

  React.useEffect(() => {
    if (alertVisible) {
      flickerRef.current?.flickerNTimes(3);
    }
  })

  return (
    <>
    <BasicPopup title="티켓 구매" buttons={buttons} buttonAlign="horizontal">
      <FlexHorizontal style={{alignItems: 'flex-start'}}>
        <ItemIconContainer>
          <TicketIcon/>
        </ItemIconContainer>
        <Space width={10}/>
        <FlexHorizontal style={{alignItems: 'flex-end'}}>
          <View style={{alignItems: 'center'}}>
            <NotoSans type="Bold">구매 수량</NotoSans> 
            <Space height={5} />
            <FlexHorizontal>
              <PurchaseQuantity type="Bold">{quantity}</PurchaseQuantity>
            </FlexHorizontal>
          </View>
          <Space width={10} />
          <View>
            <FlexHorizontal>
              <TouchableOpacity onLongPress={increaseQuantity} onPress={increaseQuantity}>
                <Circle size={50}>
                  <FAIcon name="caret-down" size={40} />
                </Circle>
              </TouchableOpacity>
              <Space width={5} />
              <TouchableOpacity onLongPress={decreaseQuantity} onPress={decreaseQuantity}>
                <Circle size={50}>
                  <FAIcon name="caret-up" size={40} />
                  <Space height={5} />
                </Circle>
              </TouchableOpacity>
            </FlexHorizontal>
          </View>
        </FlexHorizontal>
      </FlexHorizontal>
      <Space height={10} />
      <View style={{width: '100%'}}>
        <FlexHorizontal style={{justifyContent: 'space-between'}}>
          <FlexHorizontal style={{justifyContent: 'space-between', width: 110, borderBottomWidth: 1, paddingBottom: 3, alignSelf: 'flex-start'}}>
            <FlexHorizontal>
              <MoneyIcon size={10} />
              <NotoSans style={{ color: 'orange' }} type="Black">{ticketPrice}</NotoSans>
            </FlexHorizontal>
            <NotoSans style={{color: 'grey'}} type="Black">X {quantity}</NotoSans>
          </FlexHorizontal>
          <NotoSans style={{color: 'black'}} type="Black">=</NotoSans>
          <FlexHorizontal>
            <MoneyIcon size={10}/>
            <Space width={5} />
            <NotoSans style={{ color: 'orange' }} type="Black">{ticketPrice * quantity}</NotoSans>
          </FlexHorizontal>
        </FlexHorizontal>
      </View>
    </BasicPopup>
    <Modal transparent animationType="fade" onRequestClose={() => setAlertVisible(false)} visible={alertVisible}>
      <AlertContainer>
        <Flickery ref={flickerRef}>
          <RoundPaddingCenter>
            <NotoSans size={20} type="Black">골드가 부족합니다</NotoSans>
          </RoundPaddingCenter>
        </Flickery>
        <RequiredMoneyDesc>
          <NotoSans size={15} type="Black" style={{ color: 'black' }}>필요한 골드: {ticketPrice * quantity}</NotoSans>
          <NotoSans size={15} type="Black" style={{ color: 'orange' }}>보유한 골드: {playData.user.gold}</NotoSans>
          <RequiredMoney size={20} type="Black">{ticketPrice * quantity - playData.user.gold} 골드가 부족합니다</RequiredMoney>
        </RequiredMoneyDesc>
      </AlertContainer>
    </Modal>
    </>
  )
}

export default TicketPurchasePopup
