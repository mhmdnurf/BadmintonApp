import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface MethodPicker {
  selectedValue: string;
  onValueChange: (itemValue: string) => void;
}

const MethodPicker = ({selectedValue, onValueChange}: MethodPicker) => {
  return (
    <>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Metode Pembayaran</Text>
        <View style={styles.picker}>
          <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
            <Picker.Item label="Transfer" value="transfer" />
            <Picker.Item label="Member" value="member" />
          </Picker>
        </View>
      </View>
    </>
  );
};

export default MethodPicker;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    borderWidth: 3,
    borderColor: '#EEEDEB',
    borderRadius: 5,
  },
  pickerContainer: {
    marginHorizontal: 20,
    marginTop: 10,
  },
});
