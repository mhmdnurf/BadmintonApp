import React from 'react';
import {StyleSheet, View} from 'react-native';
import Header from '../components/Header';
import ListRiwayat from '../components/riwayat/DaftarRiwayat';

const RiwayatPemesanan = () => {
  const data = [
    {
      id: '1',
      date: 'Selasa, 12 Februari 2024',
      nomorLapangan: 1,
      gor: 'Chans',
      time: '17.00 - 19.00',
    },
    {
      id: '2',
      date: 'Rabu, 13 Februari 2024',
      nomorLapangan: 2,
      gor: 'Mahakam',
      time: '18.00 - 20.00',
    },
    {
      id: '3',
      date: 'Rabu, 13 Februari 2024',
      nomorLapangan: 5,
      gor: 'Mahakam',
      time: '18.00 - 20.00',
    },
    {
      id: '4',
      date: 'Rabu, 13 Februari 2024',
      nomorLapangan: 1,
      gor: 'Mahakam',
      time: '18.00 - 20.00',
    },
  ];

  return (
    <View style={styles.container}>
      <Header title="Riwayat Pemesanan" />
      <ListRiwayat data={data} />
    </View>
  );
};

export default RiwayatPemesanan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
