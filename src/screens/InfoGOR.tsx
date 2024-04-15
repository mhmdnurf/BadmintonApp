import React from 'react';
import Header from '../components/Header';
import RootContainer from '../components/RootContainer';
import BottomSpace from '../components/BottomSpace';
import InfoField from '../components/info_gor/InfoField';
import ImageProfile from '../components/profile/ImageProfile';
import firestore from '@react-native-firebase/firestore';
interface InfoGOR {
  route: any;
}

interface Data {
  namaGOR: string;
  jumlahLapangan: number;
  fotoUser: string;
  namaLengkap: string;
  jenisKelamin: string;
  email: string;
  nomor: string;
  alamat: string;
  waktuBuka: string;
  waktuTutup: string;
  fotoGOR: string;
  suratIzin: string;
  status: string;
  user_uid: string;
}

const InfoGOR = ({route}: InfoGOR) => {
  const [data, setData] = React.useState<Data>();

  const {id} = route.params;

  const fetchInfoGOR = React.useCallback(async () => {
    try {
      const doc = await firestore().collection('gor').doc(id).get();
      const fetchedData = doc.data();
      if (fetchedData) {
        setData(fetchedData as Data);

        const userDoc = await firestore()
          .collection('users')
          .doc(fetchedData.user_uid)
          .get();
        const userData = userDoc.data();
        if (userData) {
          setData(
            currentData =>
              ({
                ...currentData,
                fotoUser: userData.fotoUser,
                namaLengkap: userData.namaLengkap,
                jenisKelamin: userData.jenisKelamin,
                email: userData.email,
                nomor: userData.nomor,
              } as Data),
          );
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  }, [id]);

  React.useEffect(() => {
    fetchInfoGOR();
  }, [fetchInfoGOR]);
  return (
    <>
      <RootContainer backgroundColor="white">
        <Header title={data?.namaGOR} />
        <ImageProfile uri={data?.fotoUser} />
        <InfoField data={data} />
        <BottomSpace marginBottom={40} />
      </RootContainer>
    </>
  );
};

export default InfoGOR;
