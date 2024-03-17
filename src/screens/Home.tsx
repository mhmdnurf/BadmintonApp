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
interface Home {
  navigation: any;
}

const Home = ({navigation}: Home) => {
  const [fullName, setFullName] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [dataGOR, setDataGOR] = React.useState([] as any);
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
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  // const dataGOR = [
  //   {
  //     id: '1',
  //     namaGOR: 'GOR Chans',
  //     jumlahLapangan: 5,
  //     imageSource: require('../assets/img/lapangan_1.jpg'),
  //   },
  //   {
  //     id: '2',
  //     namaGOR: 'GOR Mahakam',
  //     jumlahLapangan: 3,
  //     imageSource: require('../assets/img/lapangan_2.jpg'),
  //   },
  //   {
  //     id: '3',
  //     namaGOR: 'GOR Rawasari',
  //     jumlahLapangan: 4,
  //     imageSource: require('../assets/img/lapangan_3.jpg'),
  //   },
  // ];

  const dataTransaksi = [
    {
      id: '1',
      date: 'Selasa, 12 Februari 2024',
      nomorLapangan: 1,
      gor: 'Chans',
      time: '17.00 - 19.00',
    },
    {
      id: '2',
      date: 'Rabu, 13 Februari 2024',
      nomorLapangan: 2,
      gor: 'Mahakam',
      time: '18.00 - 20.00',
    },
    {
      id: '3',
      date: 'Rabu, 13 Februari 2024',
      nomorLapangan: 5,
      gor: 'Mahakam',
      time: '18.00 - 20.00',
    },
    {
      id: '4',
      date: 'Rabu, 13 Februari 2024',
      nomorLapangan: 1,
      gor: 'Mahakam',
      time: '18.00 - 20.00',
    },
  ];

  const handleNavigateDetailPemesanan = () => {
    navigation.navigate('DetailPemesanan');
  };

  const handleNavigateAllPemesanan = () => {
    navigation.navigate('RiwayatPemesanan');
  };

  React.useEffect(() => {
    fetchUser();
    fetchGOR();
  }, [fetchUser, fetchGOR]);
  return (
    <>
      <RootContainer
        backgroundColor="white"
        refreshing={refreshing}
        onRefresh={fetchUser}>
        <HeaderContainer>
          <Header title="Dashboard" />
          <DashboardHeader fullName={fullName} />
          <Waktu />
        </HeaderContainer>
        <DaftarGor data={dataGOR} />
        <InformasiTransaksi
          data={dataTransaksi}
          onPress={handleNavigateDetailPemesanan}
          onPressShowAll={handleNavigateAllPemesanan}
        />
        <BottomSpace marginBottom={100} />
      </RootContainer>
    </>
  );
};

export default Home;
