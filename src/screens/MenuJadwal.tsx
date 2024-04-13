import React from 'react';
import BottomSpace from '../components/BottomSpace';
import Header from '../components/Header';
import DaftarGor from '../components/menu_jadwal/DaftarGor';
import FlatContainer from '../components/FlatContainer';
import firestore from '@react-native-firebase/firestore';

interface MenuJadwal {
  navigation: any;
}

const MenuJadwal = ({navigation}: MenuJadwal) => {
  const [dataGOR, setDataGOR] = React.useState([] as any);
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchGOR = React.useCallback(async () => {
    try {
      setRefreshing(true);
      const query = await firestore()
        .collection('gor')
        .where('status', '==', 'Aktif')
        .get();
      const data = query.docs.map(doc => {
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

  const handlePress = (id: string) => () => {
    navigation.navigate('Jadwal', {
      itemId: id,
    });
  };

  React.useEffect(() => {
    fetchGOR();
  }, [fetchGOR]);

  return (
    <>
      <FlatContainer backgroundColor="white">
        <Header title="Pilih GOR" marginBottom={20} />
        <DaftarGor
          data={dataGOR}
          onPress={handlePress}
          onRefresh={fetchGOR}
          refreshing={refreshing}
        />
        <BottomSpace marginBottom={100} />
      </FlatContainer>
    </>
  );
};

export default MenuJadwal;
