import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface TotalHarga {
  harga: number;
  label: string;
}

const TotalHarga = ({harga, label}: TotalHarga) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.hargaContainer}>
          <Text style={styles.hargaText}>Rp.{harga}</Text>
        </View>
      </View>
    </>
  );
};

export default TotalHarga;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  picker: {
    borderWidth: 3,
    borderColor: '#EEEDEB',
    borderRadius: 5,
    marginVertical: 5,
  },
  hargaContainer: {
    backgroundColor: '#AAC8A7',
    padding: 40,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 3,
    borderColor: '#EEEDEB',
  },
  hargaText: {
    fontSize: 26,
    fontWeight: '600',
    color: 'white',
  },
});
