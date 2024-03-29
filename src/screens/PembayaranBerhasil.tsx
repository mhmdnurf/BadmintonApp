import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import RootContainer from '../components/RootContainer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';

interface PembayaranBerhasil {
  navigation: any;
  route: any;
}

const PembayaranBerhasil = ({navigation, route}: PembayaranBerhasil) => {
  const {
    id,
    lapangan,
    waktuBooking,
    waktuAkhir,
    jumlahPembayaran,
    tanggalPembayaran,
    transaksi_id,
  } = route.params;
  const [isLoading, setIsLoading] = React.useState(true);
  const [dataGOR, setDataGOR] = React.useState({} as any);

  const fetchGOR = React.useCallback(async () => {
    try {
      const gorRef = firestore().collection('gor').doc(id);
      const docSnapshot = await gorRef.get();
      if (docSnapshot.exists) {
        const gorData = docSnapshot.data();
        setDataGOR(gorData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  React.useEffect(() => {
    fetchGOR();
  }, [fetchGOR]);

  return (
    <>
      <RootContainer backgroundColor="#AAC8A7">
        {isLoading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <View style={styles.container}>
            <View style={styles.card}>
              <Text style={styles.title}>Pembayaran Berhasil</Text>
              <View style={styles.icon}>
                <Icon name="check-circle" size={100} color="#AAC8A7" />
              </View>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>
                  {dataGOR.namaGOR} - Lapangan {lapangan}
                </Text>
                <Text style={styles.label}>
                  {waktuBooking} - {waktuAkhir}
                </Text>
                <Text style={styles.label}>
                  Rp. {jumlahPembayaran.toLocaleString()}
                </Text>
                <Text style={styles.label}>{tanggalPembayaran}</Text>
              </View>
              <View style={styles.line} />
              <Text style={styles.label}>Transaksi #{transaksi_id}</Text>
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
        )}
      </RootContainer>
    </>
  );
};

export default PembayaranBerhasil;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height,
  },
  card: {
    width: '80%',
    height: '85%',
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
