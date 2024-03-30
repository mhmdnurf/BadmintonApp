import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import InputField from '../InputField';

interface DetailField {
  dataMember: any;
}

const DetailField = ({dataMember}: DetailField) => {
  console.log(dataMember);
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>Status</Text>
        <InputField
          placeholder="Status"
          value={dataMember?.status}
          editable={false}
          marginBottom={20}
        />
        <Text style={styles.label}>Kuota Lapangan</Text>
        <InputField
          placeholder="Kuota Lapangan"
          value={(dataMember?.kuota || 0).toString()}
          editable={false}
          marginBottom={20}
        />
        <Text style={styles.label}>Masa Aktif</Text>
        <InputField
          placeholder="Masa Aktif"
          value={dataMember?.masaAktif}
          editable={false}
          marginBottom={20}
        />
      </View>
    </>
  );
};

export default DetailField;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins SemiBold',
    marginBottom: 5,
  },
});
