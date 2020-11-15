/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {
  StatusBar,
} from 'react-native';
import routes, { RootStackParamList } from './src/router/routes';
import {NavigationContainer, NavigationContainerRef} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Developer from './src/router/Developer';
import {Provider as ReduxProvider} from 'react-redux';
import store from './src/redux/store';
import {cardTransitionSpecs, cardTransitions} from './src/router/cardTransition';
import {enableScreens, useScreens} from 'react-native-screens';
import BuildConfig from 'react-native-config';
import codePush, {CodePushOptions} from 'react-native-code-push';
import { ModifyOption, modifyToTargetRoutes } from './src/api/navigation';

const { BUILD_ENV } = BuildConfig;

enableScreens();
const Stack = createStackNavigator<RootStackParamList>();

const buildVariable: {[T in typeof BUILD_ENV]: {
  initialRouteName: keyof typeof routes | "Developer"
}} = {
  DEV: {
    initialRouteName: "Developer",
  },
  RELEASE: {
    initialRouteName: "Main",
  }
}

let App: () => React.ReactNode = () => {
  const { initialRouteName } = buildVariable[BUILD_ENV];
  const navContainerRef = React.useRef<NavigationContainerRef>(null)
  const renderDevloperScreen = () => {
    if (BUILD_ENV === "DEV") {
      return <Stack.Screen name="Developer" component={Developer} />
    } else {
      return <></>;
    }
  }

  const filteredRoute = Object.entries(routes).filter(([routeName, routerOption]) => {
    if (routerOption.type === "dev" && BUILD_ENV === "RELEASE") {
      return false;
    } else {
      return true;
    }
  })

  React.useEffect(() => {
    const navigation = navContainerRef.current;
    if (navigation && BUILD_ENV === "RELEASE") {
      modifyToTargetRoutes(navigation, [
        {name: "LoadingScreen"},
        {name: "Main"},
      ])
    }
  })

  return (
    <>
      <StatusBar barStyle="dark-content" hidden />
      <ReduxProvider store={store}>
        <NavigationContainer ref={navContainerRef}>
          <Stack.Navigator mode="modal" initialRouteName={initialRouteName}>
            {renderDevloperScreen()}
            {filteredRoute.map(([routeName, routerOption]) => {
              return (
                <Stack.Screen
                  key={routeName}
                  name={routeName as keyof RootStackParamList}
                  component={routerOption.component}
                  options={routerOption.options || {
                    headerShown: routerOption.headerShown,
                    header: routerOption.header,
                    transitionSpec: cardTransitionSpecs,
                    cardStyleInterpolator: cardTransitions.forFade,
                  }}
                />
              );
            })}
          </Stack.Navigator>
        </NavigationContainer>
      </ReduxProvider>
    </>
  );
};

const codePushOptions: CodePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL,
  installMode: codePush.InstallMode.IMMEDIATE,
}

export default codePush(codePushOptions)(App);
