import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

interface Data {
  harga: number;
  biayaAdmin: number;
  noRekening: string;
  namaBank: string;
}

interface ProviderData {
  noRek: string;
  namaBank: string;
}

interface DetailPembayaran {
  data: Data;
  isLoading?: boolean;
  providerData: ProviderData;
}

const DetailPembayaran = ({
  data,
  isLoading,
  providerData,
}: DetailPembayaran) => {
  return (
    <>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size={'large'} color={'red'} />
        ) : (
          <>
            <Text style={styles.label}>Biaya Lapangan</Text>
            <Text style={styles.detail}>{data?.harga?.toLocaleString()}</Text>
            <Text style={styles.label}>Biaya Admin</Text>
            <Text style={styles.detail}>Rp.2,500</Text>
            <Text style={styles.label}>No. Rekening Pembayaran</Text>
            <Text
              style={
                styles.detail
              }>{`${providerData?.noRek} - ${providerData?.namaBank}`}</Text>
          </>
        )}
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
    fontFamily: 'Poppins SemiBold',
    marginBottom: 10,
    color: '#6F7789',
  },
  detail: {
    fontSize: 24,
    marginBottom: 10,
    color: '#638889',
    fontFamily: 'Poppins SemiBold',
  },
});
