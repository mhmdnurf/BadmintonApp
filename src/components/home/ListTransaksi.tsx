import React from 'react';
import {FlatList, Pressable} from 'react-native';
import TransaksiCard from './TransaksiCard';

interface TransaksiData {
  id: string;
  date: string;
  nomorLapangan: number;
  gor: string;
  time: string;
}
interface ListTransaksi {
  data: TransaksiData[];
  onPress: () => void;
}

const ListTransaksi = ({data, onPress}: ListTransaksi) => {
  return (
    <>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Pressable onPress={onPress}>
            <TransaksiCard
              date={item.date}
              nomorLapangan={item.nomorLapangan}
              gor={item.gor}
              time={item.time}
            />
          </Pressable>
        )}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default ListTransaksi;
