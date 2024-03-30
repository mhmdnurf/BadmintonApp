import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import InputField from '../InputField';

interface DataGOR {
  namaGOR: string;
  kuotaLapangan: string;
  hargaMember: string;
  masaAktif: string;
}

interface DataUser {
  noRek: string;
  namaBank: string;
}

interface PerbaruiField {
  data: DataGOR;
  dataUser: DataUser;
  onPress: () => void;
}

const PerbaruiField = ({data, dataUser, onPress}: PerbaruiField) => {
  const now = new Date();
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const month = lastDayOfMonth.toLocaleString('id-ID', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>Nama GOR</Text>
        <InputField
          placeholder="Nama GOR"
          value={data?.namaGOR}
          editable={false}
        />
        <Text style={styles.label}>Kuota Lapangan</Text>
        <InputField placeholder="Jenis Member" value="4" editable={false} />
        <Text style={styles.label}>Harga</Text>
        <InputField
          placeholder="Harga"
          value={data?.hargaMember}
          editable={false}
        />
        <Text style={styles.label}>Masa Aktif</Text>
        <InputField placeholder="Masa Aktif" value={month} editable={false} />
        <Text style={styles.label}>Nomor Rekening</Text>
        <InputField placeholder="Nomor Rekening" value={dataUser?.noRek} />
        <Text style={styles.label}>Nama Bank</Text>
        <InputField placeholder="Nama Bank" value={dataUser?.namaBank} />
        <Text style={styles.label}>Upload Bukti Pembayaran</Text>
        <Pressable style={styles.btnUpload} onPress={onPress}>
          <Text style={styles.btnText}>Upload</Text>
        </Pressable>
      </View>
    </>
  );
};

export default PerbaruiField;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 16,
    color: 'grey',
    fontFamily: 'Poppins SemiBold',
  },
  btnUpload: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  btnText: {
    color: 'white',
    fontFamily: 'Poppins SemiBold',
    fontSize: 16,
  },
});
