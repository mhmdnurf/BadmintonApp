import React from 'react';
import {FlatList, Pressable} from 'react-native';
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
  onPress: (id: string) => () => void;
}

const DaftarGor = ({data, onPress}: DaftarGor) => {
  return (
    <>
      <ContentHeader title="Daftar Gelanggang Olahraga" />
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <Pressable onPress={onPress(item.id)}>
            <LapanganCard
              uri={item.fotoGOR}
              namaGOR={item.namaGOR}
              jumlahLapangan={item.jumlahLapangan}
            />
          </Pressable>
        )}
        keyExtractor={item => item.id}
        horizontal={true}
      />
    </>
  );
};

export default DaftarGor;
