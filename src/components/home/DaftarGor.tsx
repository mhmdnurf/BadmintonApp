import React from 'react';
import {FlatList} from 'react-native';
import ContentHeader from './ContentHeader';
import LapanganCard from './LapanganCard';

const data = [
  {id: '1', namaGOR: 'GOR Chans', jumlahLapangan: 5},
  {id: '2', namaGOR: 'GOR Mahakam', jumlahLapangan: 3},
  {id: '3', namaGOR: 'GOR Rawasari', jumlahLapangan: 4},
];

const DaftarGor = () => {
  return (
    <>
      {/* Lapangan Start */}
      <ContentHeader title="Daftar GOR" />
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <LapanganCard
            namaGOR={item.namaGOR}
            jumlahLapangan={item.jumlahLapangan}
          />
        )}
        keyExtractor={item => item.id}
        horizontal={true}
      />
      {/* Lapangan End */}
    </>
  );
};

export default DaftarGor;
