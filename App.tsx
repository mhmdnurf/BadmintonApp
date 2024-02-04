import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './src/main/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import Login from './src/main/Login';

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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
