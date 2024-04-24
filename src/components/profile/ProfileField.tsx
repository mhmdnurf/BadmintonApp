import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import InputField from '../InputField';

interface Data {
  namaLengkap: string;
  jenisKelamin: string;
  email: string;
  NIK: string;
  nomor: string;
}

interface ProfileField {
  data: Data;
}

const ProfileField = ({data}: ProfileField) => {
  return (
    <>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>NIK</Text>
        <InputField value={data?.NIK} editable={false} />
        <Text style={styles.label}>Nama Lengkap</Text>
        <InputField value={data?.namaLengkap} editable={false} />
        <Text style={styles.label}>Jenis Kelamin</Text>
        <InputField value={data?.jenisKelamin} editable={false} />
        <Text style={styles.label}>Email</Text>
        <InputField value={data?.email} editable={false} />
        <Text style={styles.label}>Nomor HP</Text>
        <InputField value={data?.nomor} editable={false} />
      </View>
    </>
  );
};

export default ProfileField;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins SemiBold',
    color: '#6F7789',
  },
});
