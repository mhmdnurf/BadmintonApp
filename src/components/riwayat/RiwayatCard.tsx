/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface RiwayatCard {
  date: string;
  nomorLapangan: number;
  width?: number;
  time: string;
  gor: string;
  status: string;
  waktuBooking: string;
  waktuAkhir: string;
}

const RiwayatCard = ({
  date,
  nomorLapangan,
  width = Dimensions.get('window').width - 40,
  waktuBooking,
  waktuAkhir,
  gor,
  status,
}: RiwayatCard) => {
  return (
    <View style={styles.container}>
      <View style={[styles.cardContainer, {width}]}>
        <View style={styles.icon}>
          {status === 'pending' ? (
            <Icon name="tilde" size={30} color="#EEC759" />
          ) : status === 'batal' ? (
            <Icon name="text-box-remove-outline" size={30} color="#FF8080" />
          ) : (
            <Icon name="text-box-check-outline" size={30} color="#AAC8A7" />
          )}
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoDate}>{date}</Text>
          <Text style={styles.infoJumlah}>
            Lapangan {nomorLapangan} - {gor}
          </Text>
          <Text style={styles.infoJumlah}>
            {waktuBooking} - ${waktuAkhir}
          </Text>
        </View>
        {status === 'pending' ? (
          <View style={[styles.statusContainer, {backgroundColor: '#EEC759'}]}>
            <Text style={styles.statusText}>Menunggu Pembayaran</Text>
          </View>
        ) : status === 'batal' ? (
          <View style={[styles.statusContainer, {backgroundColor: '#FF8080'}]}>
            <Text style={styles.statusText}>Dibatalkan</Text>
          </View>
        ) : (
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>{status}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default RiwayatCard;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    alignSelf: 'center',
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 18,
    marginTop: 15,
    height: 200,
    borderWidth: 3,
    borderColor: '#EEEDEB',
    elevation: 1,
  },
  infoContainer: {
    marginLeft: 16,
    marginTop: 16,
  },
  infoDate: {fontSize: 18, color: '#6F7789', fontFamily: 'Poppins Bold'},
  infoJumlah: {fontSize: 16, color: '#6F7789', fontFamily: 'Poppins Regular'},
  statusContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#AAC8A7',
    width: 200,
    height: 40,
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
    marginBottom: 20,
  },
  statusText: {color: 'white', fontSize: 14, fontFamily: 'Poppins Bold'},
  icon: {
    position: 'absolute',
    top: -20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    elevation: 3,
  },
});
