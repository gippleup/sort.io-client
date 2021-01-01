import { CommonActions, NavigationProp, RouteProp, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { View, Text, Dimensions, Alert, AppState } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { modifyToTargetRoutes, removeTargetRoute, slimNavigate } from '@api/navigation'
import { SupportedSkin } from '@components/Block/skinMap'
import { FlexHorizontal, NotoSans, RoundPaddingCenter, Space } from '@components/Generic/StyledComponents'
import { ItemCategory } from '@components/ItemList/ItemBox'
import PriceTag from '@components/ItemList/PriceTag'
import expressions, { SupportedExpression } from '@components/Profile/Expressions'
import ScoreIcon from '@components/ScoreChecker/ScoreIcon'
import useGlobal from '@hooks/useGlobal'
import TranslationPack from '@Language/translation'
import { setExpression, setSkin } from '@redux/actions/global/creator'
import { purchaseItem } from '@redux/actions/playData/thunk'
import { RootState } from '@redux/reducers'
import { RootStackParamList } from '@router/routes'

export type ItemPurchasePopupParams = {
  category: ItemCategory;
  item: SupportedExpression | SupportedSkin;
  title: string;
  description: string;
  hasOwned: boolean;
  price: number;
  isInUse?: boolean;
};

const Popup: typeof View = styled(View)`
  background-color: royalblue;
  padding: 20px;
  width: ${Dimensions.get('window').width - 100}px;
  max-width: 320px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border-width: 5px;
  border-color: black;
`;

const ProfileContainer: typeof View = styled(View)`
  width: 150px;
  height: 150px;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,0.3);
  border-radius: 20px;
  border-width: 3px;
  border-color: dodgerblue;
  margin-vertical: 10px;
`;

const PaddedNotoSans: typeof NotoSans = styled(NotoSans)`
  padding-horizontal: 10px;
  background-color: dodgerblue;
  border-radius: 10px;
`;

const Title: typeof NotoSans = styled(PaddedNotoSans)`
  color: white;
`;

const SubTitle: typeof NotoSans = styled(PaddedNotoSans)`
  color: white;
  background-color: black;
`;

const Description: typeof NotoSans = styled(NotoSans)`
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: rgba(255,255,255,0.7);
  border-radius: 5px;
`;

type ItemPurchasePopupProps = {
  navigation: StackNavigationProp<RootStackParamList, "Popup_ItemPurchase">;
  route: RouteProp<RootStackParamList, "Popup_ItemPurchase">;
}

const ItemPurchasePopup = (props: ItemPurchasePopupProps) => {
  const {global, items, playData} = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const {language: lan} = global;
  const translation = TranslationPack[lan].screens.Shop;
  const navigation = useNavigation();
  const {
    category,
    item,
    hasOwned,
    description,
    price,
    title,
    isInUse,
  } = props.route.params;

  const status = hasOwned 
  ? isInUse
    ? "inUse"
    : "notInUse"
  : "notOwned"

  const onPressClose = () => removeTargetRoute(navigation, "Popup_ItemPurchase");

  const onPressMainButton = () => {
    const hasEnoughMoney = playData.user.gold >= price;
    if (status === "notOwned" && hasEnoughMoney) {
      dispatch(purchaseItem({
        category,
        name: item,
      }))
      onPressClose();
    } else if (status === "notOwned" && !hasEnoughMoney) {
      navigation.navigate("Popup_NotEnoughMoney")
    } else if (status === "inUse" && category === "expression") {
      modifyToTargetRoutes(navigation, [
        {name: "LoadingScreen"},
        {name: "Main", onDemand: true},
        {name: "Shop", onDemand: true},
        {name: "ExpressionEquip"},
      ])
    } else if (status === "notInUse" && category === "skin") {
      dispatch(setSkin(item as SupportedSkin))
      onPressClose();
    } else if (status === "notInUse" && category === "expression") {
      navigation.navigate("ExpressionEquip");
      onPressClose();
    }
  }

  const ItemProfile = () => {
    if (category === "skin") {
      return (
        <ScoreIcon scale={1.5} type={8} skin={item as SupportedSkin} />
      )
    } else if (category === "expression") {
      return (
        <View style={{transform: [{scale: 2}]}}>
          {expressions[item as SupportedExpression](true)}
        </View>
      )
    }

    return <></>;
  }

  const MainButton = () => {
    const text = hasOwned ? translation.equip : translation.purchase;
    return (
      <TouchableOpacity onPress={onPressMainButton}>
        <RoundPaddingCenter style={{borderWidth: 3}}>
          <NotoSans size={20} type="Bold">
            {text}
          </NotoSans>
        </RoundPaddingCenter>
      </TouchableOpacity>
    )
  }

  const CancelButton = () => {
    return (
      <TouchableOpacity onPress={onPressClose} >
        <RoundPaddingCenter style={{backgroundColor: 'grey', borderWidth: 3}}>
          <NotoSans size={20} type="Bold">
            {translation.close}
          </NotoSans>
        </RoundPaddingCenter>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{...Dimensions.get('window'), justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <View pointerEvents="none" style={{flex: 1, position: 'absolute'}} />
      <Popup>
        <Title size={25} type="Black">
          {title}
        </Title>
        <ProfileContainer>
          <ItemProfile />
        </ProfileContainer>
        <FlexHorizontal>
          <SubTitle size={20} type="Black">
            {translation.price}
          </SubTitle>
          <Space width={10} />
          <PriceTag value={price} />
        </FlexHorizontal>
        <Space height={10} />
        <Description type="Light">
          {description}
        </Description>      
      </Popup>
      <Space height={10} />
      <FlexHorizontal>
        <CancelButton />
        <Space width={10} />
        <MainButton />
      </FlexHorizontal>
    </View>
  )
}

export default ItemPurchasePopup
