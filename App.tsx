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
import routes, { RootStackParamList } from './router/routes';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Developer from './router/Developer';
import {Provider as ReduxProvider} from 'react-redux';
import store from './redux/store';
import {cardTransitionSpecs, cardTransitions} from './router/cardTransition';
import {enableScreens} from 'react-native-screens';
import BuildConfig from 'react-native-config';
import CodePush, { CodePushOptions } from 'react-native-code-push';

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

  return (
    <>
      <StatusBar barStyle="dark-content" hidden />
      <ReduxProvider store={store}>
        <NavigationContainer>
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
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  installMode: CodePush.InstallMode.ON_NEXT_RESTART,
}


App = CodePush(codePushOptions)(App)

export default App;
