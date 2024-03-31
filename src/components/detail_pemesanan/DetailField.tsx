import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import InputField from '../InputField';
import InAppBrowser from 'react-native-inappbrowser-reborn';

interface DetailField {
  dataPemesanan: any;
  dataPembayaran: any;
  dataGOR: any;
}

const DetailField = ({dataPemesanan, dataPembayaran, dataGOR}: DetailField) => {
  const tanggalPemesanan = new Date(
    dataPemesanan.tanggalPemesanan,
  ).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>Tanggal Pemesanan</Text>
        <InputField
          placeholder="Tanggal Pemesanan"
          value={tanggalPemesanan}
          editable={false}
        />
        <Text style={styles.label}>Lapangan</Text>
        <InputField
          placeholder="Lapangan"
          value={dataPemesanan.lapangan}
          editable={false}
        />
        <Text style={styles.label}>GOR</Text>
        <InputField
          placeholder="GOR"
          value={dataGOR?.namaGOR}
          editable={false}
        />
        <Text style={styles.label}>Waktu</Text>
        <InputField
          placeholder="Waktu"
          value={`${dataPemesanan.waktuBooking} - ${dataPemesanan.waktuAkhir}`}
          editable={false}
        />
        <Text style={styles.label}>Status</Text>
        <InputField placeholder="Status" value="Selesai" editable={false} />
        <Text style={styles.label}>Bukti Pembayaran</Text>
        <Pressable
          style={styles.btnContainer}
          onPress={() => InAppBrowser.open(dataPembayaran.buktiPembayaran)}>
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
    fontFamily: 'Poppins SemiBold',
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
    fontFamily: 'Poppins SemiBold',
  },
});
