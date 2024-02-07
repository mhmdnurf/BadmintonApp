import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface MemberPicker {
  selectedValue: string;
  onValueChange: (itemValue: string) => void;
}

const MemberPicker = ({selectedValue, onValueChange}: MemberPicker) => {
  return (
    <>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Pilih Member</Text>
        <View style={styles.picker}>
          <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
            <Picker.Item label="Member" value="1" />
          </Picker>
        </View>
      </View>
    </>
  );
};

export default MemberPicker;

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
