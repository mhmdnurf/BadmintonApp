import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import InputField from '../InputField';

type InfoData = {
  jumlahLapangan: number;
  namaLengkap: string;
  jenisKelamin: string;
  email: string;
  nomor: string;
  alamat: string;
  waktuBuka: string;
  waktuTutup: string;
  fotoGOR: string;
};

interface InfoField {
  data: InfoData | undefined;
}

const InfoField = ({data}: InfoField) => {
  return (
    <>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nama Pemilik</Text>
        <InputField value={data?.namaLengkap} editable={false} />
        <Text style={styles.label}>Jenis Kelamin</Text>
        <InputField value={data?.jenisKelamin} editable={false} />
        <Text style={styles.label}>Email</Text>
        <InputField value={data?.email} editable={false} />
        <Text style={styles.label}>Nomor HP</Text>
        <InputField value={data?.nomor} editable={false} />
        <Text style={styles.label}>Alamat GOR</Text>
        <InputField value={data?.alamat} editable={false} />
        <Text style={styles.label}>Waktu Buka</Text>
        <InputField value={data?.waktuBuka} editable={false} />
        <Text style={styles.label}>Waktu Tutup</Text>
        <InputField value={data?.waktuTutup} editable={false} />
        <Text style={styles.label}>Jumlah Lapangan</Text>
        <InputField value={data?.jumlahLapangan.toString()} editable={false} />
      </View>
    </>
  );
};

export default InfoField;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins SemiBold',
    color: '#31363F',
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
