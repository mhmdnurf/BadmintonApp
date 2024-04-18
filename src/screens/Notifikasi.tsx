import React from 'react';
import Header from '../components/Header';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import FlatContainer from '../components/FlatContainer';
import NotifikasiCard from '../components/notifikasi/NotifikasiCard';
import BottomSpace from '../components/BottomSpace';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useIsFocused} from '@react-navigation/native';
const Notifikasi = () => {
  const isFocused = useIsFocused();
  const [data, setData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  // const data = [
  //   {
  //     user_uid: '1',
  //     title: 'Pembayaran Berhasil',
  //     pesan: 'Pembayaran untuk lapangan 1 berhasil',
  //     status: 'success',
  //   },
  //   {
  //     user_uid: '1',
  //     title: 'Pembayaran Gagal',
  //     pesan: 'Pembayaran untuk lapangan 1 berhasil',
  //     status: 'failed',
  //   },
  // ];

  const fetchNotifikasi = React.useCallback(async () => {
    setRefreshing(true);
    try {
      const user = auth().currentUser;
      const notifikasi = await firestore()
        .collection('notifikasi')
        .where('user_uid', '==', user.uid)
        .get();
      const dataNotifikasi = notifikasi.docs.map(doc => doc.data());
      setData(dataNotifikasi);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  React.useEffect(() => {
    if (isFocused) {
      fetchNotifikasi();
    }
  }, [fetchNotifikasi, isFocused]);
  return (
    <FlatContainer backgroundColor="white">
      <Header title="Notifikasi" />
      <View style={styles.container}>
        <Text style={styles.title}>Informasi Terkini</Text>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={fetchNotifikasi}
            />
          }
          data={data}
          renderItem={({item, index}) => (
            <NotifikasiCard
              key={index}
              status={item.status}
              title={item.title}
              pesan={item.pesan}
            />
          )}
          ListFooterComponent={<BottomSpace marginBottom={100} />}
        />
      </View>
    </FlatContainer>
  );
};

export default Notifikasi;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins SemiBold',
  },
});
