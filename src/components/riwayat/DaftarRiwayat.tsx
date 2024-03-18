import React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import RiwayatCard from './RiwayatCard';

interface RiwayatData {
  id: string;
  tanggalPemesanan: string;
  lapangan: number;
  lokasi: string;
  waktuBooking: string;
  status: string;
  waktuAkhir: string;
}

interface ListRiwayat {
  data: RiwayatData[];
  refreshing?: boolean;
  onRefresh?: () => void;
}

const ListRiwayat = ({data, refreshing, onRefresh}: ListRiwayat) => {
  return (
    <>
      <FlatList
        data={data}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({item}) => (
          <RiwayatCard
            date={new Date(item.tanggalPemesanan).toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
            nomorLapangan={item.lapangan}
            gor={item.lokasi}
            time={item.waktuBooking}
            status={item.status}
            waktuBooking={item.waktuBooking}
            waktuAkhir={item.waktuAkhir}
          />
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default ListRiwayat;
