import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
interface MethodPicker {
  selectedValue: string;
  onValueChange: (itemValue: string) => void;
  dataMember: any;
}

const MethodPicker = ({
  selectedValue,
  onValueChange,
  dataMember,
}: MethodPicker) => {
  return (
    <>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Metode Pembayaran</Text>
        <View style={styles.picker}>
          {dataMember?.status === 'Aktif' && dataMember?.kuota > 0 ? (
            <>
              <Picker
                selectedValue={selectedValue}
                onValueChange={onValueChange}>
                <Picker.Item label="Transfer" value="transfer" />
                <Picker.Item
                  label={`Member (${dataMember.kuota} Kuota)`}
                  value="member"
                />
              </Picker>
            </>
          ) : (
            <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
              <Picker.Item label="Transfer" value="transfer" />
            </Picker>
          )}
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
