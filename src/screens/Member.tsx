import React from 'react';
import Header from '../components/Header';
import MemberField from '../components/member/MemberField';
import ListMember from '../components/member/ListMember';
import FlatContainer from '../components/FlatContainer';
import firestore from '@react-native-firebase/firestore';

interface Member {
  navigation: any;
}

const Member = ({navigation}: Member) => {
  const [dataGOR, setDataGOR] = React.useState([] as any);
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchDataGOR = React.useCallback(async () => {
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

  React.useEffect(() => {
    fetchDataGOR();
  }, [fetchDataGOR]);

  const handleNavigateMemberById = (id: string) => () => {
    navigation.navigate('DetailMember', {
      id,
    });
  };
  return (
    <>
      <FlatContainer backgroundColor="white">
        <Header title="Member" />
        <MemberField />
        <ListMember
          data={dataGOR}
          onPress={handleNavigateMemberById}
          refreshing={refreshing}
        />
      </FlatContainer>
    </>
  );
};

export default Member;
