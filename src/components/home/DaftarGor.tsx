import React from 'react';
import {FlatList} from 'react-native';
import ContentHeader from './ContentHeader';
import LapanganCard from './LapanganCard';

interface GorData {
  id: string;
  namaGOR: string;
  jumlahLapangan: number;
  fotoGOR: string;
}

interface DaftarGor {
  data: GorData[];
}

const DaftarGor = ({data}: DaftarGor) => {
  return (
    <>
      <ContentHeader title="Daftar Gelanggang Olahraga" />
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <LapanganCard
            uri={item.fotoGOR}
            namaGOR={item.namaGOR}
            jumlahLapangan={item.jumlahLapangan}
          />
        )}
        keyExtractor={item => item.id}
        horizontal={true}
      />
    </>
  );
};

export default DaftarGor;
