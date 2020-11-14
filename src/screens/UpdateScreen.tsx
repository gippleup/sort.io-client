import { CommonActions, NavigationProp, RouteProp, useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, BackHandler } from 'react-native'
import Updater from '../components/Updater'
import BuildConfig from 'react-native-config';
import { RootStackParamList } from '../router/routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { modifyToTargetRoutes } from '../api/navigation';

const {BUILD_ENV} = BuildConfig;

type UpdateScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Updater">;
  route: RouteProp<RootStackParamList, "Updater">
}

const UpdateScreen = (props: UpdateScreenProps) => {
  const navigation = props.navigation;

  const unsubscribeBeforeRemove = navigation.addListener("beforeRemove", (e) => {
    if (e.data.action.type === "GO_BACK") {
      e.preventDefault();
    }
  })

  const onFinish = () => {
    unsubscribeBeforeRemove();
    if (BUILD_ENV === "RELEASE") {
      modifyToTargetRoutes(navigation, [
        {name: "LoadingScreen"},
        {name: "Main"},
      ])
    } else {
      modifyToTargetRoutes(navigation, [
        {name: "Developer"},
      ]);
    }
  }

  React.useEffect(() => {
    return () => {
      unsubscribeBeforeRemove();
    }
  })

  return (
    <View>
      <Updater onFinish={onFinish} />
    </View>
  )
}

export default UpdateScreen
