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
  SafeAreaView,
  StatusBar,
  Text,
} from 'react-native';
import routes, { RootStackParamList } from './router/routes';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Developer from './router/Developer';
import {Provider as ReduxProvider} from 'react-redux';
import store from './redux/store';
import { PopupProvider } from './hooks/usePopup';

const Stack = createStackNavigator<RootStackParamList>();

const App: () => React.ReactNode = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <PopupProvider>
        <ReduxProvider store={store}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Developer">
              {/* <Stack.Screen name="Developer" component={Developer} /> */}
              {Object.entries(routes).map(([routeName, options]) => {
                return (
                  <Stack.Screen
                    key={routeName}
                    name={routeName as keyof RootStackParamList}
                    component={options.component}
                    options={{
                      headerShown: options.headerShown,
                      header: options.header,
                    }}
                  />
                );
              })}
            </Stack.Navigator>
          </NavigationContainer>
        </ReduxProvider>
      </PopupProvider>
    </>
  );
};

export default App;
