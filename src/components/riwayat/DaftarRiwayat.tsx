import React from 'react';
import {FlatList, Pressable, RefreshControl} from 'react-native';
import RiwayatCard from './RiwayatCard';

interface RiwayatData {
  booking_uid: string;
  tanggalPemesanan: string;
  lapangan: number;
  lokasi: string;
  waktuBooking: string;
  status: string;
  kondisi: string;
  waktuAkhir: string;
}

interface ListRiwayat {
  data: RiwayatData[];
  refreshing?: boolean;
  onRefresh?: () => void;
  onPress: (id: string) => () => void;
}

const ListRiwayat = ({data, refreshing, onRefresh, onPress}: ListRiwayat) => {
  return (
    <>
      <FlatList
        data={data}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({item}) => (
          <Pressable onPress={onPress(item.booking_uid)}>
            <RiwayatCard
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
              time={item.waktuBooking}
              status={item.status}
              waktuBooking={item.waktuBooking}
              waktuAkhir={item.waktuAkhir}
              kondisi={item.kondisi}
            />
          </Pressable>
        )}
        keyExtractor={item => item.booking_uid}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default ListRiwayat;
