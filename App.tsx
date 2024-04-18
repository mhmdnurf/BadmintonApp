import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import Login from './src/screens/Login';
import ForgotPassword from './src/screens/ForgotPassword';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Profile from './src/screens/Profile';
import MenuJadwal from './src/screens/MenuJadwal';
import RiwayatPemesanan from './src/screens/RiwayatPemesanan';
import Jadwal from './src/screens/Jadwal';
import PemesananLapangan from './src/screens/PemesananLapangan';
import Pembayaran from './src/screens/Pembayaran';
import DetailPemesanan from './src/screens/DetailPemesanan';
import Member from './src/screens/Member';
import DetailMember from './src/screens/DetailMember';
import PerbaruiMember from './src/screens/PerbaruiMember';
import PembayaranMember from './src/screens/PembayaranMember';
import EditProfile from './src/screens/EditProfile';
import PembayaranBerhasil from './src/screens/PembayaranBerhasil';
import InfoGOR from './src/screens/InfoGOR';
import Notifikasi from './src/screens/Notifikasi';

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
          name="Member"
          component={Member}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="badge-account-horizontal" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Notifikasi"
          component={Notifikasi}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="bell" color={color} size={size} />
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
          <Stack.Screen
            name="PemesananLapangan"
            component={PemesananLapangan}
            options={{
              title: '',
              headerShown: true,
              headerTintColor: '#AAC8A7',
            }}
          />
          <Stack.Screen
            name="Pembayaran"
            component={Pembayaran}
            options={{title: '', headerShown: true, headerTintColor: '#AAC8A7'}}
          />
          <Stack.Screen
            name="DetailPemesanan"
            component={DetailPemesanan}
            options={{
              title: '',
              headerShown: true,
              headerTintColor: '#AAC8A7',
            }}
          />
          <Stack.Screen
            name="DetailMember"
            component={DetailMember}
            options={{
              title: '',
              headerShown: true,
              headerTintColor: '#AAC8A7',
            }}
          />
          <Stack.Screen
            name="PerbaruiMember"
            component={PerbaruiMember}
            options={{
              title: '',
              headerShown: true,
              headerTintColor: '#AAC8A7',
            }}
          />
          <Stack.Screen
            name="PembayaranMember"
            component={PembayaranMember}
            options={{
              title: '',
              headerShown: true,
              headerTintColor: '#AAC8A7',
            }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
              title: '',
              headerShown: true,
              headerTintColor: '#AAC8A7',
            }}
          />
          <Stack.Screen
            name="PembayaranBerhasil"
            component={PembayaranBerhasil}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="InfoGOR"
            component={InfoGOR}
            options={{
              headerShown: true,
              title: '',
              headerTintColor: '#AAC8A7',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
