import { RouteProp, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react'
import { View, Text } from 'react-native'
import { NotoSans } from '../../components/Generic/StyledComponents';
import { RootStackParamList } from '../../router/routes';

type LoadingScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "LoadingScreen">;
  route: RouteProp<RootStackParamList, "LoadingScreen">;
}

export type LoadingScreenParams = {
  navigateTo?: keyof RootStackParamList;
  params?: any;
  text?: string;
}

const LoadingScreen = (props: LoadingScreenProps) => {
  const {navigation, route} = props;
  const {params} = route;
  const unsubscribeBeforeRemove = navigation.addListener("beforeRemove", (e) => {
    if (e.data.action.type === "GO_BACK") {
      e.preventDefault();
    }
  })

  navigation.addListener("focus", (e) => {
    if (params && params.navigateTo) {
      navigation.replace(params.navigateTo, params.params);
    }
  })

  React.useEffect(() => {
    return () => {
      unsubscribeBeforeRemove();
    }
  })

  const text = (params && params.text !== undefined) ? params.text : "로딩중";

  return (
    <View style={{flex: 1, backgroundColor: "black", justifyContent: "center", alignItems: "center"}}>
      <NotoSans type="Black" color="white" size={30}>{text}</NotoSans>
    </View>
  )
}

export default LoadingScreen
