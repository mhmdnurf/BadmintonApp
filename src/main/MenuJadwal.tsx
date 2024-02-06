import React from 'react';
import BottomSpace from '../components/BottomSpace';
import Header from '../components/Header';
import DaftarGor from '../components/menu_jadwal/DaftarGor';
import FlatContainer from '../components/FlatContainer';

interface MenuJadwal {
  navigation: any;
}

const MenuJadwal = ({navigation}: MenuJadwal) => {
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

  const handlePress = (id: string) => () => {
    navigation.navigate('Jadwal', {
      itemId: id,
    });
  };

  return (
    <>
      <FlatContainer backgroundColor="white">
        <Header title="Pilih GOR" marginBottom={20} />
        <DaftarGor data={data} onPress={handlePress} />
        <BottomSpace marginBottom={100} />
      </FlatContainer>
    </>
  );
};

export default MenuJadwal;
