import React from 'react';
import {StyleSheet, View} from 'react-native';
import Header from '../components/Header';
import ListRiwayat from '../components/riwayat/DaftarRiwayat';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';

const RiwayatPemesanan = () => {
  const isFocused = useIsFocused();
  const [dataRiwayat, setDataRiwayat] = React.useState([] as any);
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

  React.useEffect(() => {
    if (isFocused) {
      fetchRiwayat();
    }
  }, [fetchRiwayat, isFocused]);

  const handleRefresh = () => {
    fetchRiwayat();
  };

  return (
    <View style={styles.container}>
      <Header title="Riwayat Pemesanan" />
      <ListRiwayat
        data={dataRiwayat}
        refreshing={refreshing}
        onRefresh={handleRefresh}
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
