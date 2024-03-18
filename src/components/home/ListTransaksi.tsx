import React from 'react';
import {FlatList, Pressable} from 'react-native';
import TransaksiCard from './TransaksiCard';

interface TransaksiData {
  id: string;
  tanggalPemesanan: string;
  lapangan: number;
  lokasi: string;
  waktuMulai: string;
  waktuAkhir: string;
  status: string;
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
              date={new Date(item.tanggalPemesanan).toLocaleDateString(
                'id-ID',
                {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                },
              )}
              nomorLapangan={item.lapangan}
              gor={item.lokasi}
              waktuMulai={item.waktuMulai}
              waktuAkhir={item.waktuAkhir}
              status={item.status}
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
