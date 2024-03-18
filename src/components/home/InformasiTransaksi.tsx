import React from 'react';
import ContentHeader from './ContentHeader';
import ListTransaksi from './ListTransaksi';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface TransaksiData {
  id: string;
  tanggalPemesanan: string;
  lapangan: number;
  lokasi: string;
  waktuBooking: string;
  status: string;
  waktuMulai: string;
  waktuAkhir: string;
}
interface InformasiTransaksi {
  data: TransaksiData[];
  onPress: () => void;
  onPressShowAll: () => void;
}

const InformasiTransaksi = ({
  data,
  onPress,
  onPressShowAll,
}: InformasiTransaksi) => {
  return (
    <>
      <View style={styles.container}>
        <ContentHeader title="Informasi Pemesanan" />
        <Pressable onPress={onPressShowAll}>
          <Text style={styles.btnText}>Show all</Text>
        </Pressable>
      </View>
      <ListTransaksi data={data} onPress={onPress} />
    </>
  );
};

export default InformasiTransaksi;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: {
    marginRight: 20,
    fontSize: 16,
    color: '#B7B7B7',
    fontFamily: 'Poppins Regular',
  },
});
