import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import InputField from '../InputField';
import {Picker} from '@react-native-picker/picker';

interface PemesananField {
  lamaBermain: string;
  onValueChange: (itemValue: string, itemIndex: number) => void;
  bookingValue: string;
  tanggalValue: string;
  lapanganValue: string;
  lokasiValue: string;
}

const PemesananField = ({
  lamaBermain,
  onValueChange,
  bookingValue,
  tanggalValue,
  lapanganValue,
  lokasiValue,
}: PemesananField) => {
  return (
    <>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tanggal</Text>
        <InputField value={tanggalValue} editable={false} />
        <Text style={styles.label}>Waktu Booking</Text>
        <InputField value={bookingValue} editable={false} />
        <Text style={styles.label}>Lama Bermain</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={lamaBermain}
            onValueChange={onValueChange}
            style={{
              color: '#4F4F4F',
            }}>
            <Picker.Item label="2 Jam" value="2" />
            <Picker.Item label="4 Jam" value="4" />
            <Picker.Item label="6 Jam" value="6" />
            <Picker.Item label="8 Jam" value="8" />
          </Picker>
        </View>
        <Text style={styles.label}>Lapangan</Text>
        <InputField value={lapanganValue} editable={false} />
        <Text style={styles.label}>Lokasi</Text>
        <InputField value={lokasiValue} editable={false} />
      </View>
    </>
  );
};

export default PemesananField;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontFamily: 'Poppins SemiBold',
    color: '#4F4F4F',
  },
  inputContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  picker: {
    borderWidth: 3,
    borderColor: '#EEEDEB',
    borderRadius: 5,
    marginVertical: 5,
  },
});
