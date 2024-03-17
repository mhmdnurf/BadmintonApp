import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const DetailPembayaran = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.detail}>Biaya Lapangan</Text>
        <Text style={styles.detail}>Rp. 60.000</Text>
        <Text style={styles.detail}>Biaya Admin</Text>
        <Text style={styles.detail}>Rp. 2.500</Text>
        <Text style={styles.detail}>No. Rekening Pembayaran</Text>
        <Text style={styles.detail}>1234567890 - BNI</Text>
      </View>
    </>
  );
};

export default DetailPembayaran;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 3,
    borderColor: '#EEEDEB',
    padding: 20,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Nunito Bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
  },
});
