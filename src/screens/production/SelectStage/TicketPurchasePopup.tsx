import React from 'react'
import { View, TouchableOpacity, Modal } from 'react-native'
import BasicPopup, { PopupButton } from '../../../components/Generic/BasicPopup'
import { TicketIcon } from './_StyledComponents'
import styled from 'styled-components'
import { NotoSans, FlexHorizontal, Space, Circle, RoundPaddingCenter } from '../../../components/Generic/StyledComponents'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import MoneyIcon from '../../../components/Main/MoneyIcon'
import usePlayData from '../../../hooks/usePlayData'
import chroma from 'chroma-js'
import Flickery from '../../../components/Flickery'
import { useDispatch, useSelector } from 'react-redux'
import * as thunkAction from '../../../redux/actions/playData/thunk'
import { useNavigation } from '@react-navigation/native'
import { AppState } from '../../../redux/store'
import TranslationPack from '../../../Language/translation'
import { trackUser } from '../../../api/analytics'
import { stringifyValues } from '../../../api/utils'

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
  const {playData, global} = useSelector((state: AppState) => state);
  const translation = TranslationPack[global.language].screens.SelectStage;
  const dispatch = useDispatch();
  const [alertVisible, setAlertVisible] = React.useState(false);
  const flickerRef = React.createRef<Flickery>();
  const total = ticketPrice * quantity;
  const navigation = useNavigation();
  
  const purchaseTicket = () => {
    if (quantity === 0) return;
    if (playData.user.gold >= total) {
      trackUser("User purchased ticket", stringifyValues({quantity}))
      dispatch(thunkAction.purchaseTicket(quantity));
      navigation.goBack();
    } else {
      trackUser("User tried to purchased ticket but failed", stringifyValues({quantity}))
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 1500)
    }
  }

  const buttons: PopupButton[] = [
    {
      text: translation.purchase,
      onPress: purchaseTicket,
    },
    {
      text: translation.cancel,
      onPress: () =>{
        trackUser("Closed ticket purchase popup");
        navigation.goBack();
      },
    },
  ]

  React.useEffect(() => {
    if (alertVisible) {
      flickerRef.current?.flickerNTimes(3);
    }
  })

  return (
    <>
    <BasicPopup title={translation.ticketPurchase} buttons={buttons} buttonAlign="horizontal">
      <View style={{width: 240}}>
        <FlexHorizontal style={{alignItems: 'flex-start'}}>
          <ItemIconContainer>
            <TicketIcon/>
          </ItemIconContainer>
          <Space width={10}/>
          <FlexHorizontal style={{alignItems: 'flex-end', justifyContent: 'space-between', flex: 1}}>
            <View style={{alignItems: 'center'}}>
              <NotoSans type="Bold">{translation.purchaseQuantity}</NotoSans> 
              <Space height={5} />
              <FlexHorizontal>
                <PurchaseQuantity type="Bold">{quantity}</PurchaseQuantity>
              </FlexHorizontal>
            </View>
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
      </View>
    </BasicPopup>
    <Modal transparent animationType="fade" onRequestClose={() => setAlertVisible(false)} visible={alertVisible}>
      <AlertContainer>
        <Flickery ref={flickerRef}>
          <RoundPaddingCenter>
            <NotoSans size={20} type="Black">{translation.notEnoughGold}</NotoSans>
          </RoundPaddingCenter>
        </Flickery>
        <RequiredMoneyDesc>
          <NotoSans size={15} type="Black" style={{ color: 'black' }}>{translation.requiredGold}: {ticketPrice * quantity}</NotoSans>
          <NotoSans size={15} type="Black" style={{ color: 'orange' }}>{translation.havingGold}: {playData.user.gold}</NotoSans>
          <RequiredMoney size={20} type="Black">{translation.notEnoughGoldMessage(ticketPrice * quantity - playData.user.gold)}</RequiredMoney>
        </RequiredMoneyDesc>
      </AlertContainer>
    </Modal>
    </>
  )
}

export default TicketPurchasePopup
