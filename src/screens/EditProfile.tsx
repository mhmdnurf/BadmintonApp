import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import RootContainer from '../components/RootContainer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface PembayaranBerhasil {
  navigation: any;
}

const EditProfile = ({navigation}: PembayaranBerhasil) => {
  return (
    <>
      <RootContainer backgroundColor="#AAC8A7">
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.title}>Pembayaran Berhasil</Text>
            <View style={styles.icon}>
              <Icon name="check-circle" size={100} color="#AAC8A7" />
            </View>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>GOR Chans - Lapangan 1</Text>
              <Text style={styles.label}>14.00 - 15.00</Text>
              <Text style={styles.label}>Rp.27,500</Text>
              <Text style={styles.label}>Senin, 20 September 2021</Text>
            </View>
            <View style={styles.line} />
            <Text style={styles.label}>Transaksi #217981739813</Text>
            <Text style={styles.notes}>
              Terimakasih, atas pembayaran anda, pesanan anda akan kami proses
              dan mohon menunggu pihak pemilik GOR untuk memverifikasi
              pembayaran anda 😊.
            </Text>
            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? 'gray' : '#AAC8A7',
                  borderWidth: pressed ? 3 : 0,
                  borderColor: '#8C9B8E',
                },
                styles.btn,
              ]}
              onPress={() => navigation.navigate('Home')}>
              <Text style={styles.btnText}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </RootContainer>
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height,
  },
  card: {
    width: '80%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins Bold',
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
  icon: {
    alignSelf: 'center',
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins SemiBold',
    color: 'black',
    textAlign: 'center',
  },
  notes: {
    marginTop: 20,
    fontSize: 14,
    fontFamily: 'Poppins Regular',
    color: 'gray',
    textAlign: 'center',
  },
  line: {
    borderWidth: 2,
    marginTop: 40,
    marginBottom: 20,
    borderStyle: 'dashed',
    borderColor: 'gray',
  },
  btn: {
    backgroundColor: '#AAC8A7',
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 16,
    fontFamily: 'Poppins SemiBold',
    color: 'white',
    textAlign: 'center',
    padding: 10,
  },
  labelContainer: {
    marginTop: 20,
  },
});
