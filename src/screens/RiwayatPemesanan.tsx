import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import Header from '../components/Header';
import ListRiwayat from '../components/riwayat/DaftarRiwayat';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';

interface RiwayatPemesanan {
  navigation: any;
}

const RiwayatPemesanan = ({navigation}: RiwayatPemesanan) => {
  const isFocused = useIsFocused();
  const [dataRiwayat, setDataRiwayat] = React.useState([] as any);
  const [dataPembayaran, setDataPembayaran] = React.useState([] as any);
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchRiwayat = React.useCallback(async () => {
    setRefreshing(true);
    try {
      const user = auth().currentUser;
      const query = await firestore()
        .collection('booking')
        .where('user_uid', '==', user?.uid)
        .get();
      const data = query.docs.map(doc => doc.data());
      setDataRiwayat(data);
    } catch (error) {
      console.log('Error fetching data: ', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const fetchRiwayatPembayaran = React.useCallback(async () => {
    setRefreshing(true);
    try {
      const user = auth().currentUser;
      const query = await firestore()
        .collection('payment')
        .where('user_uid', '==', user?.uid)
        .get();
      const data = query.docs.map(doc => doc.data());
      setDataPembayaran(data);
    } catch (error) {
      console.log('Error fetching data: ', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  React.useEffect(() => {
    if (isFocused) {
      fetchRiwayat();
      fetchRiwayatPembayaran();
    }
  }, [fetchRiwayat, isFocused, fetchRiwayatPembayaran]);

  const handleRefresh = () => {
    fetchRiwayat();
  };

  const handleNavigationById = (id: string) => () => {
    const data = dataRiwayat.find((item: any) => item.booking_uid === id);
    if (data.status === 'expired') {
      Alert.alert(
        'Pemesanan telah kadaluarsa',
        'Silahkan lakukan pemesanan ulang',
      );
    } else if (data.status === 'pending') {
      navigation.navigate('Pembayaran', {
        id,
      });
    } else {
      navigation.navigate('DetailPemesanan', {
        id,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Riwayat Pemesanan" />
      <ListRiwayat
        data={dataRiwayat}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onPress={handleNavigationById}
      />
    </View>
  );
};

export default RiwayatPemesanan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
