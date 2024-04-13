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
      const querySnapshot = await firestore()
        .collection('member')
        .where('user_uid', '==', user.uid)
        .where('gor_uid', '==', id)
        .get();

      if (querySnapshot.empty) {
        setDataMember({
          status: 'Tidak Aktif',
          kuota: '0',
          masaAktif: '-',
        });
        return;
      }

      // Assuming there is only one matching document
      const doc = querySnapshot.docs[0];
      const data = doc.data();

      // Parse masaAktif
      const [monthName, year] = data.masaAktif.split(' ');
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      const monthNumber = monthNames.indexOf(monthName) + 1; // Months are 1-indexed
      const masaAktifDate = new Date(parseInt(year, 10), monthNumber, 1);

      const currentDate = new Date();

      // Compare the year and the month
      if (
        masaAktifDate.getFullYear() < currentDate.getFullYear() ||
        (masaAktifDate.getFullYear() === currentDate.getFullYear() &&
          masaAktifDate.getMonth() < currentDate.getMonth())
      ) {
        await firestore()
          .collection('member')
          .doc(doc.id)
          .update({status: 'Tidak Aktif'});
      }

      setDataMember(data);
    } catch (error) {
      console.log('Error getting document:', error);
    }
  }, [id]);

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
