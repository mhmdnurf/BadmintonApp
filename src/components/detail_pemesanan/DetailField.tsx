import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import InputField from '../InputField';

const DetailField = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>Tanggal Pemesanan</Text>
        <InputField
          placeholder="Tanggal Pemesanan"
          value="21 Desember 2023"
          editable={false}
        />
        <Text style={styles.label}>Lapangan</Text>
        <InputField placeholder="Lapangan" value="1" editable={false} />
        <Text style={styles.label}>GOR</Text>
        <InputField placeholder="GOR" value="GOR Chans" editable={false} />
        <Text style={styles.label}>Waktu</Text>
        <InputField
          placeholder="Waktu"
          value="17.00 - 19.00"
          editable={false}
        />
        <Text style={styles.label}>Status</Text>
        <InputField placeholder="Status" value="Selesai" editable={false} />
        <Text style={styles.label}>Bukti Pembayaran</Text>
        <Pressable style={styles.btnContainer}>
          <Text style={styles.btnText}>Lihat Bukti Pembayaran</Text>
        </Pressable>
      </View>
    </>
  );
};

export default DetailField;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 40,
  },
  label: {
    fontSize: 16,
    color: '#41444B',
    fontWeight: '600',
  },
  btnContainer: {
    backgroundColor: '#AAC8A7',
    padding: 15,
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
