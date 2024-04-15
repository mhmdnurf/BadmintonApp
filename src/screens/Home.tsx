import React from 'react';
import Header from '../components/Header';
import DashboardHeader from '../components/home/DashboardHeader';
import Waktu from '../components/home/Waktu';
import DaftarGor from '../components/home/DaftarGor';
import HeaderContainer from '../components/home/HeaderContainer';
import RootContainer from '../components/RootContainer';
import InformasiTransaksi from '../components/home/InformasiTransaksi';
import BottomSpace from '../components/BottomSpace';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import {Alert} from 'react-native';
interface Home {
  navigation: any;
}

const Home = ({navigation}: Home) => {
  const [fullName, setFullName] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [dataGOR, setDataGOR] = React.useState([] as any);
  const [dataTransaksi, setDataTransaksi] = React.useState([] as any);
  const isFocused = useIsFocused();
  const fetchUser = React.useCallback(async () => {
    try {
      setRefreshing(true);
      const user = auth().currentUser;
      const userDoc = firestore().collection('users').doc(user?.uid);
      const docSnapshot = await userDoc.get();
      if (docSnapshot.exists) {
        const userData = docSnapshot.data();
        setFullName(userData?.namaLengkap);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const fetchGOR = React.useCallback(async () => {
    try {
      setRefreshing(true);
      const query = firestore()
        .collection('gor')
        .where('status', '==', 'Aktif');
      const querySnapshot = await query.get();
      const data = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setDataGOR(data);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const fetchPemesanan = React.useCallback(async () => {
    try {
      setRefreshing(true);
      const user = auth().currentUser;
      const query = firestore()
        .collection('booking')
        .where('user_uid', '==', user?.uid)
        .limit(3)
        .orderBy('createdAt', 'asc');
      const querySnapshot = await query.get();
      const data = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setDataTransaksi(data);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const handleNavigatePemesananById = (id: string) => () => {
    const data = dataTransaksi.find((item: any) => item.booking_uid === id);
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

  const handleNavigateAllPemesanan = () => {
    navigation.navigate('RiwayatPemesanan');
  };

  const handleNavigateGORById = (id: string) => () => {
    navigation.navigate('InfoGOR', {
      id,
    });
  };

  React.useEffect(() => {
    if (isFocused) {
      fetchUser();
      fetchGOR();
      fetchPemesanan();
    }
  }, [fetchUser, fetchGOR, fetchPemesanan, isFocused]);

  const onRefresh = () => {
    fetchUser();
    fetchGOR();
    fetchPemesanan();
  };

  return (
    <>
      <RootContainer
        backgroundColor="white"
        refreshing={refreshing}
        onRefresh={onRefresh}>
        <HeaderContainer>
          <Header title="Dashboard" />
          <DashboardHeader fullName={fullName} />
          <Waktu />
        </HeaderContainer>
        <DaftarGor data={dataGOR} onPress={handleNavigateGORById} />
        <InformasiTransaksi
          data={dataTransaksi}
          onPress={handleNavigatePemesananById}
          onPressShowAll={handleNavigateAllPemesanan}
        />
        <BottomSpace marginBottom={100} />
      </RootContainer>
    </>
  );
};

export default Home;
