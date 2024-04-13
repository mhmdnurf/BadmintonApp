import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Pdf from 'react-native-pdf';

interface DisplayBukti {
  buktiPembayaran: any;
}

const DisplayBukti = ({buktiPembayaran}: DisplayBukti) => {
  return (
    <>
      {buktiPembayaran?.type && buktiPembayaran?.type.startsWith('image/') && (
        <View style={styles.container}>
          <Image
            source={{uri: buktiPembayaran.data}}
            style={[styles.content, styles.image]}
          />
        </View>
      )}
      {buktiPembayaran?.type && buktiPembayaran?.type === 'application/pdf' && (
        <View style={styles.container}>
          <Pdf source={{uri: buktiPembayaran.data}} style={styles.content} />
        </View>
      )}
    </>
  );
};

export default DisplayBukti;

const styles = StyleSheet.create({
  container: {
    height: 200,
    marginVertical: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 15,
  },
  content: {width: '100%', height: '100%'},
  image: {
    resizeMode: 'contain',
  },
});
