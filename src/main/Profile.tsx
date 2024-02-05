import React from 'react';
import RootContainer from '../components/RootContainer';
import Header from '../components/Header';
import ImageProfile from '../components/profile/ImageProfile';
import BottomSpace from '../components/BottomSpace';
import ProfileField from '../components/profile/ProfileField';
import RiwayatButton from '../components/profile/RiwayatButton';
import LogoutButton from '../components/profile/LogoutButton';

const Profile = () => {
  const handleNavigateRiwayat = () => {
    console.log('Riwayat');
  };
  const handleLogout = () => {
    console.log('Logout');
  };
  return (
    <>
      <RootContainer backgroundColor="white">
        <Header title="Profile" />
        <ImageProfile />
        <ProfileField />
        <RiwayatButton onPress={handleNavigateRiwayat} />
        <LogoutButton onPress={handleLogout} />
        <BottomSpace marginBottom={100} />
      </RootContainer>
    </>
  );
};

export default Profile;
