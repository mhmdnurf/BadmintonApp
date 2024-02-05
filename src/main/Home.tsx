import React from 'react';
import {StyleSheet} from 'react-native';
import Header from '../components/Header';
import DashboardHeader from '../components/home/DashboardHeader';
import Waktu from '../components/home/Waktu';
import DaftarGor from '../components/home/DaftarGor';
import HeaderContainer from '../components/home/HeaderContainer';
import RootContainer from '../components/RootContainer';

interface Home {
  navigation: any;
}

const Home = ({navigation}: Home) => {
  return (
    <>
      <RootContainer backgroundColor="whitesmoke">
        <HeaderContainer>
          <Header title="Dashboard" />
          <DashboardHeader fullName="Pedry" />
          <Waktu />
        </HeaderContainer>
        <DaftarGor />
      </RootContainer>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});
