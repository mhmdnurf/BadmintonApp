import React from 'react';
import {StyleSheet} from 'react-native';
import Header from '../components/Header';
import DashboardHeader from '../components/home/DashboardHeader';
import Waktu from '../components/home/Waktu';
import DaftarGor from '../components/home/DaftarGor';
import HeaderContainer from '../components/home/HeaderContainer';
import RootContainer from '../components/RootContainer';
import InformasiTransaksi from '../components/home/InformasiTransaksi';
import BottomSpace from '../components/BottomSpace';

interface Home {
  navigation: any;
}

const Home = ({navigation}: Home) => {
  const data = [
    {
      id: '1',
      namaGOR: 'GOR Chans',
      jumlahLapangan: 5,
      imageSource: require('../assets/img/lapangan_1.jpg'),
    },
    {
      id: '2',
      namaGOR: 'GOR Mahakam',
      jumlahLapangan: 3,
      imageSource: require('../assets/img/lapangan_2.jpg'),
    },
    {
      id: '3',
      namaGOR: 'GOR Rawasari',
      jumlahLapangan: 4,
      imageSource: require('../assets/img/lapangan_3.jpg'),
    },
  ];
  return (
    <>
      <RootContainer backgroundColor="white">
        <HeaderContainer>
          <Header title="Dashboard" />
          <DashboardHeader fullName="Pedry" />
          <Waktu />
        </HeaderContainer>
        <DaftarGor data={data} />
        <InformasiTransaksi />
        <BottomSpace marginBottom={100} />
      </RootContainer>
    </>
  );
};

export default Home;
