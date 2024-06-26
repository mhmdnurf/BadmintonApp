import React from 'react';
import {FlatList, Pressable} from 'react-native';
import TransaksiCard from './TransaksiCard';

interface TransaksiData {
  booking_uid: string;
  tanggalPemesanan: string;
  lapangan: number;
  lokasi: string;
  waktuBooking: string;
  waktuAkhir: string;
  status: string;
}
interface ListTransaksi {
  data: TransaksiData[];
  onPress: (id: string) => () => void;
}

const ListTransaksi = ({data, onPress}: ListTransaksi) => {
  return (
    <>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Pressable onPress={onPress(item.booking_uid)}>
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
              waktuBooking={item.waktuBooking}
              waktuAkhir={item.waktuAkhir}
              status={item.status}
            />
          </Pressable>
        )}
        keyExtractor={item => item.booking_uid}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default ListTransaksi;
