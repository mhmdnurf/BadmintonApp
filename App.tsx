import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './src/main/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import Login from './src/main/Login';
import ForgotPassword from './src/main/ForgotPassword';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{
              title: '',
              headerShown: true,
              headerTintColor: '#AAC8A7',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
