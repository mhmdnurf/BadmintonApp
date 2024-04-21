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
import PendingButton from '../components/pembayaran/PendingButton';
import {Alert} from 'react-native';
import ModalLoader from '../components/ModalLoader';

interface Pembayaran {
  route: any;
  navigation: any;
}

const Pembayaran = ({route, navigation}: Pembayaran) => {
  const {id} = route.params;
  const [selectedValue, setSelectedValue] = React.useState('transfer');
  const [buktiPembayaran, setBuktiPembayaran] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [bookData, setBookData] = React.useState({} as any);
  const [pemilikData, setPemilikData] = React.useState({} as any);
  const [dataMember, setDataMember] = React.useState({} as any);
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

  const fetchMember = React.useCallback(async () => {
    const user = auth().currentUser;
    try {
      const querySnapshot = await firestore()
        .collection('member')
        .where('user_uid', '==', user.uid)
        .where('gor_uid', '==', bookData.gor_uid)
        .get();

      // Assuming there is only one matching document
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      console.log(data);

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
      const monthNumber = monthNames.indexOf(monthName); // Months are 0-indexed
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
      console.log(data.member_uid);
    } catch (error) {
      console.log('Error getting document:', error);
    }
  }, [bookData.gor_uid]);

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
    fetchMember();
  }, [fetchMember]);

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
      let buktiPembayaranURL = '';

      if (selectedValue !== 'member') {
        if (!buktiPembayaran) {
          Alert.alert(
            'Upload bukti pembayaran terlebih dahulu',
            'Bukti Pembayaran tidak boleh kosong',
          );
          setIsLoading(false);
          return;
        }

        const buktiPembayaranFileName = `buktiPembayaran/${
          user?.uid
        }/buktiPembayaran${user?.uid}/${new Date().getTime()}`;
        const buktiPembayaranReference = storage().ref(buktiPembayaranFileName);

        const buktiPembayaranFilePath = `${RNFS.DocumentDirectoryPath}/${buktiPembayaran}`;
        await RNFS.copyFile(buktiPembayaran.uri, buktiPembayaranFilePath);
        const buktiPembayaranBlob = await RNFS.readFile(
          buktiPembayaranFilePath,
          'base64',
        );

        await buktiPembayaranReference.putString(buktiPembayaranBlob, 'base64');
        buktiPembayaranURL = await buktiPembayaranReference.getDownloadURL();
      }

      const paymentRef = firestore()
        .collection('payment')
        .doc(bookData.booking_uid);
      paymentRef.set({
        createdAt: firestore.FieldValue.serverTimestamp(),
        gor_uid: bookData.gor_uid,
        user_uid: user?.uid,
        booking_uid: bookData.booking_uid,
        payment_uid: bookData.booking_uid,
        jumlahPembayaran:
          selectedValue === 'member' ? 0 : bookData.harga + 2500,
        buktiPembayaran: buktiPembayaranURL,
        status: selectedValue === 'member' ? 'Selesai' : 'menunggu konfirmasi',
        metodePembayaran: selectedValue,
      });

      if (selectedValue === 'member' && dataMember?.kuota > 0) {
        const memberRef = firestore()
          .collection('member')
          .doc(dataMember.member_uid);
        memberRef.update({
          kuota: firestore.FieldValue.increment(-1),
        });
      }
      const bookingRef = firestore()
        .collection('booking')
        .doc(bookData.booking_uid);
      bookingRef.update({
        status: selectedValue === 'member' ? 'Selesai' : 'menunggu konfirmasi',
      });

      if (selectedValue !== 'member') {
        const notifikasiRef = firestore().collection('notifikasi');
        notifikasiRef.add({
          createdAt: firestore.FieldValue.serverTimestamp(),
          user_uid: bookData.gor_uid,
          title: 'Pemesanan Lapangan Masuk',
          pesan: `Ada pemesanan lapangan di Lapangan ${bookData.lapangan} pada pukul ${bookData.waktuBooking} - ${bookData.waktuAkhir} tanggal ${bookData.tanggalPemesanan}`,
          booking_uid: bookData.booking_uid,
        });
      }
      console.log('Successfully uploaded bukti pembayaran');
      navigation.navigate('PembayaranBerhasil', {
        id: bookData.gor_uid,
        lapangan: bookData.lapangan,
        waktuBooking: bookData.waktuBooking,
        waktuAkhir: bookData.waktuAkhir,
        tanggalPembayaran: new Date().toLocaleDateString('id-ID', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        transaksi_id: bookData.booking_uid,
        jumlahPembayaran: bookData.harga + 2500,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigationHome = () => {
    try {
      const user = auth().currentUser;
      const paymentRef = firestore()
        .collection('payment')
        .doc(bookData.booking_uid);
      paymentRef.set({
        createdAt: firestore.FieldValue.serverTimestamp(),
        gor_uid: bookData.gor_uid,
        user_uid: user?.uid,
        booking_uid: bookData.booking_uid,
        payment_uid: bookData.booking_uid,
        jumlahPembayaran: bookData.harga + 2500,
        status: 'Belum Dikonfirmasi',
        metodePembayaran: selectedValue,
      });
    } catch (error) {
      console.log(error);
    } finally {
      navigation.navigate('Home');
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
          dataMember={dataMember}
        />
        <UploadButton onPress={uploadFile} uploadedFiles={buktiPembayaran} />
        <ConfirmButton
          title="Konfirmasi Pembayaran"
          onPress={handleSubmit}
          isLoading={isLoading}
        />
        <PendingButton onPress={handleNavigationHome} />
        <BottomSpace marginBottom={40} />
        <ModalLoader isLoading={isLoading} />
      </RootContainer>
    </>
  );
};

export default Pembayaran;
