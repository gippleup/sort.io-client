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
import routes from './router/routes';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Developer from './router/Developer';
import {Provider as ReduxProvider} from 'react-redux';
import store from './redux/store';

const Stack = createStackNavigator();

const App: () => React.ReactNode = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ReduxProvider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Developer">
            <Stack.Screen name="Developer" component={Developer} />
            {Object.entries(routes).map(([routeName, options]) => {
              return (
                <Stack.Screen
                  key={routeName}
                  name={routeName}
                  component={options.component}
                  options={{headerShown: options.headerShown}}
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
