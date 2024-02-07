import React from 'react';
import RootContainer from '../components/RootContainer';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import Header from '../components/Header';
import TotalHarga from '../components/pemesanan/TotalHarga';
import {Picker} from '@react-native-picker/picker';
import BottomSpace from '../components/BottomSpace';
import DocumentPicker from 'react-native-document-picker';

const Pembayaran = () => {
  const [selectedValue, setSelectedValue] = React.useState('2');
  const [result, setResult] = React.useState(''); // New state variable for the result

  const onValueChange = (itemValue: string) => {
    setSelectedValue(itemValue);
  };

  const uploadFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setResult(res.uri); // Set the result to the file URI
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  return (
    <>
      <RootContainer backgroundColor="white">
        <Header title="Pembayaran" marginBottom={20} />
        <TotalHarga harga={60000} label="Jumlah yang harus dibayarkan" />
        <View style={styles.container}>
          <Text style={styles.detail}>Biaya Lapangan</Text>
          <Text style={styles.detail}>Rp. 60.000</Text>
          <Text style={styles.detail}>Biaya Admin</Text>
          <Text style={styles.detail}>Rp. 2.500</Text>
          <Text style={styles.detail}>No. Rekening Pembayaran</Text>
          <Text style={styles.detail}>1234567890 - BNI</Text>
        </View>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Pilih Member</Text>
          <View style={styles.picker}>
            <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
              <Picker.Item label="Member" value="1" />
            </Picker>
          </View>
        </View>
        {/* Upload Pembayaran */}
        <View style={styles.uploadContainer}>
          <Button title="Upload Pembayaran" onPress={uploadFile} />
        </View>
        {/* New button to show the result */}
        <View style={styles.resultContainer}>
          <Button title="Show Result" onPress={() => Alert.alert(result)} />
        </View>
        <BottomSpace marginBottom={40} />
      </RootContainer>
    </>
  );
};

export default Pembayaran;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 3,
    borderColor: '#EEEDEB',
    padding: 20,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
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
  uploadContainer: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  resultContainer: {
    marginHorizontal: 20,
    marginTop: 10,
  },
});
