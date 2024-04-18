import React from 'react';
import RootContainer from '../components/RootContainer';
import Header from '../components/Header';
import ImageProfile from '../components/profile/ImageProfile';
import BottomSpace from '../components/BottomSpace';
import ProfileField from '../components/profile/ProfileField';
import RiwayatButton from '../components/profile/RiwayatButton';
import LogoutButton from '../components/profile/LogoutButton';
import EditButton from '../components/profile/EditButton';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

interface Profile {
  navigation: any;
}

const Profile = ({navigation}: Profile) => {
  const isFocused = useIsFocused();
  const [data, setData] = React.useState<any>();

  const fetchProfile = React.useCallback(async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        const doc = await firestore().collection('users').doc(user.uid).get();
        const dataUser = doc.data();
        setData(dataUser);
      }
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  }, []);

  React.useEffect(() => {
    if (isFocused) {
      fetchProfile();
    }
  }, [isFocused, fetchProfile]);
  const handleNavigateRiwayat = () => {
    navigation.navigate('RiwayatPemesanan');
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Apakah anda yakin untuk keluar?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          try {
            const currentUser = auth().currentUser;
            if (currentUser) {
              await auth().signOut();
              await AsyncStorage.removeItem('userToken');
              console.log('User signed out!');
              navigation.replace('Login');
            } else {
              console.log('No user is currently signed in.');
            }
          } catch (error) {
            console.log('Error signing out:', error);
          }
        },
      },
    ]);
  };

  const handleNavigateToEditProfile = () => {
    navigation.navigate('EditProfile', {
      data,
    });
  };

  return (
    <>
      <RootContainer backgroundColor="white">
        <Header title="Profile" />
        <ImageProfile uri={data?.fotoUser} />
        <EditButton onPress={handleNavigateToEditProfile} />
        <ProfileField data={data} />
        <RiwayatButton onPress={handleNavigateRiwayat} />
        <LogoutButton onPress={handleLogout} />
        <BottomSpace marginBottom={100} />
      </RootContainer>
    </>
  );
};

export default Profile;
