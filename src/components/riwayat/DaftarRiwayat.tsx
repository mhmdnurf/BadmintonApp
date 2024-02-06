import React from 'react';
import {FlatList} from 'react-native';
import RiwayatCard from './RiwayatCard';

interface RiwayatData {
  id: string;
  date: string;
  nomorLapangan: number;
  gor: string;
  time: string;
}

interface ListRiwayat {
  data: RiwayatData[];
}

const ListRiwayat = ({data}: ListRiwayat) => {
  return (
    <>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <RiwayatCard
            date={item.date}
            nomorLapangan={item.nomorLapangan}
            gor={item.gor}
            time={item.time}
          />
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default ListRiwayat;
