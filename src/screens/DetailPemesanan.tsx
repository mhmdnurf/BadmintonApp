import React from 'react';
import Header from '../components/Header';
import RootContainer from '../components/RootContainer';
import DetailField from '../components/detail_pemesanan/DetailField';
import BottomSpace from '../components/BottomSpace';
import firestore from '@react-native-firebase/firestore';

interface DetailPemesanan {
  route: any;
}

const DetailPemesanan = ({route}: DetailPemesanan) => {
  const {id} = route.params;
  const [dataPemesanan, setDataPemesanan] = React.useState({} as any);
  const [dataPembayaran, setDataPembayaran] = React.useState({} as any);
  const [dataGOR, setDataGOR] = React.useState({} as any);

  const fetchDataPemesanan = React.useCallback(async () => {
    try {
      const query = await firestore().collection('booking').doc(id).get();
      setDataPemesanan(query.data());
      console.log(query.data());
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const fetchDataPembayaran = React.useCallback(async () => {
    try {
      const query = await firestore().collection('payment').doc(id).get();
      setDataPembayaran(query.data());
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const fetchDataGOR = React.useCallback(async () => {
    try {
      const query = await firestore()
        .collection('gor')
        .doc(dataPemesanan.gor_uid)
        .get();
      setDataGOR(query.data());
    } catch (error) {
      console.log(error);
    }
  }, [dataPemesanan]);

  React.useEffect(() => {
    fetchDataPemesanan();
    fetchDataPembayaran();
  }, [fetchDataPemesanan, fetchDataPembayaran]);

  React.useEffect(() => {
    if (dataPemesanan.gor_uid) {
      fetchDataGOR();
    }
  }, [dataPemesanan.gor_uid, fetchDataGOR]);
  return (
    <>
      <RootContainer backgroundColor="white">
        <Header title="Detail Pemesanan" />
        <DetailField
          dataPembayaran={dataPembayaran}
          dataPemesanan={dataPemesanan}
          dataGOR={dataGOR}
        />
        <BottomSpace marginBottom={40} />
      </RootContainer>
    </>
  );
};

export default DetailPemesanan;
