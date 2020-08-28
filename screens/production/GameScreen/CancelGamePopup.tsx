import React from 'react'
import { View, Text } from 'react-native'
import BasicPopup from '../../../components/Generic/BasicPopup'
import { NotoSans } from '../../../components/Generic/StyledComponents'
import { useNavigation, RouteProp, CommonActions } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import routes, { RootStackParamList } from '../../../router/routes'

type CancelGameNavigationProp = StackNavigationProp<RootStackParamList, 'Popup_CancelGame'>
type CancelGameRouteProp = RouteProp<RootStackParamList, 'Popup_CancelGame'>

export type CancelGameParams = {
  text: string;
}

type CancelGameProps = {
  route: CancelGameRouteProp;
  navigation: CancelGameNavigationProp;
}

const CancelGamePopup = (props: CancelGameProps) => {
  const {text} = props.route.params;
  const navigation = props.navigation;
  return (
    <View style={{flex: 1}}>
      <BasicPopup
        title="PAUSE"
        buttonAlign="horizontal"
        buttons={[
          {
            text: "예",
            onPress: () => {
              navigation.dispatch((state) => {
                const filteredRoutes = state.routes.slice(0, state.routes.length - 2);
                const result = CommonActions.reset({
                  ...state,
                  routes: filteredRoutes,
                  index: filteredRoutes.length - 1,
                });
                return result;
              })
            },
            style: {
              backgroundColor: 'pink',
            }
          },
          {
            text: "아니요",
            onPress: navigation.goBack,
            style: {
              backgroundColor: 'lightgrey',
            }
          },
        ]}>
        <NotoSans type="Black">{text}</NotoSans>
      </BasicPopup>
    </View>
  )
}

export default CancelGamePopup
