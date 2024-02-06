import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './src/main/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import Login from './src/main/Login';
import ForgotPassword from './src/main/ForgotPassword';
import Register from './src/main/Register';
import Home from './src/main/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Profile from './src/main/Profile';
import MenuJadwal from './src/main/MenuJadwal';
import RiwayatPemesanan from './src/main/RiwayatPemesanan';
import Jadwal from './src/main/Jadwal';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName="HomeTab"
        screenOptions={{
          tabBarActiveTintColor: '#AAC8A7',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            display: 'flex',
            borderRadius: 15,
            position: 'absolute',
            backgroundColor: 'white',
            marginHorizontal: 15,
            marginVertical: 12,
            height: 60,
          },
          tabBarShowLabel: false,
        }}>
        <Tab.Screen
          name="HomeTab"
          component={Home}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="home" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="MenuJadwal"
          component={MenuJadwal}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="calendar-clock-outline" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="account-box" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </>
  );
};

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
            name="Register"
            component={Register}
            options={{
              title: '',
              headerShown: true,
              headerTintColor: '#AAC8A7',
            }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{
              title: '',
              headerShown: true,
              headerTintColor: '#AAC8A7',
            }}
          />
          <Stack.Screen
            name="Home"
            component={MainTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="RiwayatPemesanan"
            component={RiwayatPemesanan}
            options={{
              title: '',
              headerShown: true,
              headerTintColor: '#AAC8A7',
            }}
          />
          <Stack.Screen
            name="Jadwal"
            component={Jadwal}
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
