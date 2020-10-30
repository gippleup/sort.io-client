import { CommonActions, NavigationProp, RouteProp, useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, BackHandler } from 'react-native'
import Updater from '../components/Updater'
import BuildConfig from 'react-native-config';
import { RootStackParamList } from '../router/routes';
import { StackNavigationProp } from '@react-navigation/stack';
import PatternBackground from '../components/GameScene/PatternBackground';

const {BUILD_ENV} = BuildConfig;

type UpdateScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Updater">;
  route: RouteProp<RootStackParamList, "Updater">
}

const UpdateScreen = (props: UpdateScreenProps) => {
  const navigation = props.navigation;
  const navigateTo = (routeName: keyof RootStackParamList) => {
    navigation.dispatch((state) => {
      return CommonActions.reset({
        ...state,
        routes: [{
          key: routeName + Date.now(),
          name: routeName,
        }],
        index: 0,
      })
    })
  }

  const onFinish = () => {
    if (BUILD_ENV === "RELEASE") {
      navigateTo("Main");
    } else {
      navigateTo("Developer");
    }
  }

  const blockBack = () => {
    return true;
  }

  BackHandler.addEventListener("hardwareBackPress", blockBack);

  React.useEffect(() => {
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", blockBack);
    }
  })

  return (
    <View>
      <Updater onFinish={onFinish} />
    </View>
  )
}

export default UpdateScreen
