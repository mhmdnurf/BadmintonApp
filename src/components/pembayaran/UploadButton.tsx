import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Pdf from 'react-native-pdf';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type uploadedFiles = {
  data: string;
  type: string;
};

interface UploadButton {
  onPress: () => void;
  uploadedFiles: uploadedFiles;
}

const UploadButton = ({onPress, uploadedFiles}: UploadButton) => {
  return (
    <>
      <View style={styles.uploadContainer}>
        <Text style={styles.label}>Upload Bukti Pembayaran</Text>
        {uploadedFiles?.type && uploadedFiles?.type.startsWith('image/') && (
          <View style={styles.fileContainer}>
            <Image source={{uri: uploadedFiles.data}} style={styles.image} />
          </View>
        )}
        {uploadedFiles?.type && uploadedFiles?.type === 'application/pdf' && (
          <View style={styles.fileContainer}>
            <Pdf source={{uri: uploadedFiles.data}} style={styles.pdf} />
          </View>
        )}
        <Pressable onPress={onPress} style={styles.btnUpload}>
          <Icon name="plus" size={30} color="white" />
        </Pressable>
      </View>
    </>
  );
};

export default UploadButton;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  uploadContainer: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  resultContainer: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  btnUpload: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#EEEDEB',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#AAC8A7',
  },
  fileContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#EEEDEB',
    borderRadius: 10,
    marginBottom: 10,
  },
  image: {width: 200, height: 200, resizeMode: 'contain'},
  pdf: {width: 200, height: 200},
});
