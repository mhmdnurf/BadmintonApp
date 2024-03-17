import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import InputField from '../InputField';

const PerbaruiField = () => {
  const now = new Date();
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const month = lastDayOfMonth.toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  console.log(month);
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>GOR Chans</Text>
        <InputField placeholder="Nama GOR" value="GOR Chans" editable={false} />
        <Text style={styles.label}>Kuota Lapangan</Text>
        <InputField placeholder="Jenis Member" value="6" editable={false} />
        <Text style={styles.label}>Harga</Text>
        <InputField placeholder="Harga" value="Rp. 300.000" editable={false} />
        <Text style={styles.label}>Masa Aktif</Text>
        <InputField placeholder="Masa Aktif" value={month} editable={false} />
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
});
