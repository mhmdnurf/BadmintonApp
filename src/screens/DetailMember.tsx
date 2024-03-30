import React from 'react';
import Header from '../components/Header';
import RootContainer from '../components/RootContainer';
import DetailField from '../components/detail_member/DetailField';
import PerpanjangButton from '../components/detail_member/PerpanjangButton';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
interface DetailMember {
  navigation: any;
  route: any;
}

const DetailMember = ({navigation, route}: DetailMember) => {
  const {id} = route.params;
  const [dataMember, setDataMember] = React.useState<any>({});
  const fetchMember = React.useCallback(async () => {
    const user = auth().currentUser;
    try {
      const query = await firestore().collection('member').doc(user.uid).get();
      const data = query.data();
      if (!data) {
        setDataMember({
          status: 'Tidak Aktif',
          kuota: '0',
          masaAktif: '-',
        });
        return;
      }
      setDataMember(data);
    } catch (error) {
      console.log('Error getting document:', error);
    }
  }, []);

  React.useEffect(() => {
    fetchMember();
  }, [fetchMember]);
  const handleNavigatePerbaruiMember = () => {
    navigation.navigate('PerbaruiMember', {id: id});
  };
  return (
    <>
      <RootContainer backgroundColor="white">
        <Header title="Detail Member" />
        <DetailField dataMember={dataMember} />
        <PerpanjangButton onPress={handleNavigatePerbaruiMember} />
      </RootContainer>
    </>
  );
};

export default DetailMember;
