import React from 'react';
import RootContainer from '../components/RootContainer';
import Header from '../components/Header';
import TotalHarga from '../components/pemesanan/TotalHarga';
import BottomSpace from '../components/BottomSpace';
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import ConfirmButton from '../components/pemesanan/ConfirmButton';
import DetailPembayaran from '../components/pembayaran/DetailPembayaran';
import UploadButton from '../components/pembayaran/UploadButton';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import Timer from '../components/pembayaran/Timer';
import MethodPicker from '../components/pembayaran/MethodPicker';

interface Pembayaran {
  route: any;
  navigation: any;
}

const Pembayaran = ({route, navigation}: Pembayaran) => {
  const {id} = route.params;
  const [selectedValue, setSelectedValue] = React.useState('2');
  const [buktiPembayaran, setBuktiPembayaran] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [bookData, setBookData] = React.useState({} as any);
  const [pemilikData, setPemilikData] = React.useState({} as any);
  const onValueChange = (itemValue: string) => {
    setSelectedValue(itemValue);
  };
  const [timeLeft, setTimeLeft] = React.useState(0);

  const fetchBooking = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const bookingRef = firestore().collection('booking').doc(id);
      const docSnapshot = await bookingRef.get();
      if (docSnapshot.exists) {
        const bookingData = docSnapshot.data();
        setBookData(bookingData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const fetchPemilik = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const pemilikRef = firestore().collection('users').doc(bookData.gor_uid);
      const docSnapshot = await pemilikRef.get();
      if (docSnapshot.exists) {
        const providerData = docSnapshot.data();
        setPemilikData(providerData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [bookData]);

  React.useEffect(() => {
    fetchBooking();
  }, [fetchBooking]);
  React.useEffect(() => {
    fetchPemilik();
  }, [fetchPemilik]);

  React.useEffect(() => {
    const bookingRef = firestore().collection('booking').doc(id);

    const updateTimer = () => {
      bookingRef.get().then(docSnapshot => {
        const data = docSnapshot.data();
        if (data) {
          const now = Date.now();
          const expiredAt = data.expiredAt.toDate().getTime();
          const time = Math.max(0, expiredAt - now);
          setTimeLeft(time);

          // If timeLeft is zero, update booking status to "expired"
          if (time === 0) {
            bookingRef.update({status: 'expired'});
            navigation.navigate('Home');
          }
        }
      });
    };

    // Update timer immediately and then every second
    updateTimer();
    const timerId = setInterval(updateTimer, 1000);

    // Clean up the timer on unmount
    return () => clearInterval(timerId);
  }, [id, navigation]);

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

  const handleSubmit = async () => {
    setIsLoading(true);
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

      if (buktiPembayaranURL) {
        const paymentRef = firestore().collection('payment').doc();
        paymentRef.set({
          createdAt: firestore.FieldValue.serverTimestamp(),
          gor_uid: bookData.gor_uid,
          user_uid: user?.uid,
          booking_uid: bookData.booking_uid,
          payment_uid: paymentRef.id,
          jumlahPembayaran: bookData.harga + 2500,
          buktiPembayaran: buktiPembayaranURL,
          status: 'Belum Dikonfirmasi',
          metodePembayaran: selectedValue,
        });
        console.log('Successfully uploaded bukti pembayaran');
      } else {
        console.log('Failed to upload bukti pembayaran');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      navigation.navigate('PembayaranBerhasil');
    }
  };

  return (
    <>
      <RootContainer backgroundColor="white">
        <Header title="Pembayaran" marginBottom={20} />
        <Timer timeLeft={timeLeft} />
        <TotalHarga
          harga={(bookData?.harga + 2500).toLocaleString()}
          label="Jumlah yang harus dibayarkan"
        />
        <DetailPembayaran
          data={bookData}
          isLoading={isLoading}
          providerData={pemilikData}
        />
        <MethodPicker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
        />
        <UploadButton onPress={uploadFile} uploadedFiles={buktiPembayaran} />
        <ConfirmButton
          title="Konfirmasi Pembayaran"
          onPress={handleSubmit}
          isLoading={isLoading}
        />
        <BottomSpace marginBottom={40} />
      </RootContainer>
    </>
  );
};

export default Pembayaran;
