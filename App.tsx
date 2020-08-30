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

const Stack = createStackNavigator<RootStackParamList>();

const App: () => React.ReactNode = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" hidden />
      <ReduxProvider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Developer">
            <Stack.Screen name="Developer" component={Developer} />
            {Object.entries(routes).map(([routeName, routerOption]) => {
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

export default App;
