import React from 'react';
import Header from '../components/Header';
import RootContainer from '../components/RootContainer';
import PerbaruiField from '../components/perbarui_member/PerbaruiField';
import ConfirmButton from '../components/perbarui_member/ConfirmButton';
import firestore from '@react-native-firebase/firestore';
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import BottomSpace from '../components/BottomSpace';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import DisplayBukti from '../components/member/DisplayBukti';
import ModalLoader from '../components/ModalLoader';
interface PerbaruiMember {
  navigation: any;
  route: any;
}

const PerbaruiMember = ({navigation, route}: PerbaruiMember) => {
  const {id} = route.params;
  const [dataGOR, setDataGOR] = React.useState<any>({});
  const [dataUser, setDataUser] = React.useState<any>({});
  const [buktiPembayaran, setBuktiPembayaran] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchGOR = React.useCallback(async () => {
    try {
      const query = await firestore().collection('gor').doc(id).get();
      const data = query.data();
      setDataGOR(data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const fetchUser = React.useCallback(async () => {
    try {
      const query = await firestore().collection('users').doc(id).get();
      const data = query.data();
      setDataUser(data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  React.useEffect(() => {
    fetchGOR();
    fetchUser();
  }, [fetchGOR, fetchUser]);

  const uploadFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });

      const selectedFile = res.uri;
      const selectedFileName = res.name;
      const fileType = res.type;

      console.log({
        selectedFile,
        selectedFileName,
        fileType,
      });

      const fileData = await RNFS.readFile(selectedFile, 'base64');

      setBuktiPembayaran({
        data: `data:${fileType};base64,${fileData}`,
        type: fileType,
        uri: selectedFile,
        name: selectedFileName,
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.info(err);
      } else {
        throw err;
      }
    }
  };

  const handlePembayaranMember = async () => {
    setIsLoading(true);
    if (!buktiPembayaran) {
      Alert.alert('Upload bukti pembayaran terlebih dahulu');
      return;
    }
    try {
      const user = auth().currentUser;
      const buktiPembayaranFileName = `buktiPembayaran/${
        user?.uid
      }/buktiPembayaran${user?.uid}/${new Date().getTime()}`;
      const buktiPembayaranReference = storage().ref(buktiPembayaranFileName);

      const buktiPembayaranFilePath = `${RNFS.DocumentDirectoryPath}/${buktiPembayaran}`;
      if (buktiPembayaran) {
        await RNFS.copyFile(buktiPembayaran.uri, buktiPembayaranFilePath);
      }
      const buktiPembayaranBlob = await RNFS.readFile(
        buktiPembayaranFilePath,
        'base64',
      );

      await buktiPembayaranReference.putString(buktiPembayaranBlob, 'base64');
      const buktiPembayaranURL =
        await buktiPembayaranReference.getDownloadURL();

      const date = new Date();
      const month = date.toLocaleString('id-ID', {
        month: 'long',
        year: 'numeric',
      });

      if (buktiPembayaranURL) {
        const userUidSubstring = user?.uid.substring(0, 10);
        const gorUidSubstring = dataGOR.user_uid.substring(0, 10);
        const docId = `${userUidSubstring}${gorUidSubstring}`;
        const memberRef = firestore().collection('member').doc(docId);
        memberRef.set({
          createdAt: firestore.FieldValue.serverTimestamp(),
          gor_uid: dataGOR.user_uid,
          user_uid: user?.uid,
          masaAktif: month,
          kuota: 4,
          member_uid: docId,
          jumlahPembayaran: dataGOR.hargaMember,
          buktiPembayaran: buktiPembayaranURL,
          status: 'Menunggu Aktivasi',
        });

        const notifikasiRef = firestore().collection('notifikasi');
        await notifikasiRef.add({
          createdAt: firestore.FieldValue.serverTimestamp(),
          user_uid: dataGOR.user_uid,
          title: 'Terdapat Member Melakukan Pembayaran',
          pesan: 'Anda memiliki member baru yang perlu diaktivasi',
          member_uid: docId,
        });
      } else {
        console.log('Failed to upload bukti pembayaran');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      Alert.alert(
        'Berhasil mengirim bukti pembayaran',
        'Mohon menunggu member anda diaktivasi oleh pemilik GOR',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ],
      );
    }
  };
  return (
    <>
      <RootContainer backgroundColor="white">
        <Header title="Perbarui Member" />
        <PerbaruiField
          data={dataGOR}
          dataUser={dataUser}
          onPress={uploadFile}
        />
        <DisplayBukti buktiPembayaran={buktiPembayaran} />
        <ConfirmButton onPress={handlePembayaranMember} />
        <BottomSpace marginBottom={40} />
        <ModalLoader isLoading={isLoading} />
      </RootContainer>
    </>
  );
};

export default PerbaruiMember;
