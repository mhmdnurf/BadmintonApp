import React from 'react';
import RootContainer from '../components/RootContainer';
import Header from '../components/Header';
import PemesananField from '../components/pemesanan/PemesananField';
import TotalHarga from '../components/pemesanan/TotalHarga';
import BottomSpace from '../components/BottomSpace';
import ConfirmButton from '../components/pemesanan/ConfirmButton';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
interface PemesananLapangan {
  route: any;
  navigation: any;
}

const PemesananLapangan = ({route, navigation}: PemesananLapangan) => {
  const {waktuBooking, tanggalPemesanan, dataLapangan, lapangan} = route.params;

  const [lamaBermain, setLamaBermain] = React.useState('2 Jam');
  const [isLoading, setIsLoading] = React.useState(false);

  const lapanganNumber = lapangan.split(' ')[1];

  const timeNumber = parseInt(lamaBermain.split(' ')[0], 10);

  const harga = (timeNumber * dataLapangan.hargaLapangan) / 2;

  const generateTimes = (): string[] => {
    const startHour = parseInt(waktuBooking.split('.')[0], 10);
    const times = [];

    for (let i = 0; i <= timeNumber; i++) {
      const hour = startHour + i;
      times.push(hour < 10 ? `0${hour}.00` : `${hour}.00`);
    }

    return times;
  };
  const waktu = generateTimes();

  const handleSubmit = async () => {
    Alert.alert(
      'Apakah anda yakin akan memesan lapangan?',
      'Segera lakukan pembayaran, setelah pemesanan dilakukan',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Ya',
          onPress: async () => {
            setIsLoading(true);
            let bookingRef;
            try {
              const user = auth().currentUser;
              bookingRef = firestore().collection('booking').doc();
              await bookingRef.set({
                lamaBermain,
                waktuBooking,
                tanggalPemesanan,
                lapangan: lapanganNumber,
                waktu: waktu,
                createdAt: firestore.FieldValue.serverTimestamp(),
                gor_uid: dataLapangan.id,
                user_uid: user?.uid,
                lokasi: dataLapangan.namaGOR,
                status: 'pending',
                waktuMulai: waktuBooking,
                waktuAkhir: waktu[2],
                booking_uid: bookingRef.id,
                harga: harga,
              });
            } catch (error) {
              console.log(error);
            } finally {
              setIsLoading(false);
              if (bookingRef) {
                navigation.navigate('Pembayaran', {id: bookingRef.id});
              }
            }
          },
        },
      ],
    );
  };

  return (
    <>
      <RootContainer backgroundColor="white">
        <Header title="Pemesanan Lapangan" marginBottom={20} />
        <PemesananField
          lamaBermain={lamaBermain}
          onValueChange={itemValue => setLamaBermain(itemValue)}
          bookingValue={waktuBooking}
          tanggalValue={new Date(tanggalPemesanan).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
          lapanganValue={lapanganNumber}
          lokasiValue={dataLapangan.namaGOR}
        />
        <TotalHarga harga={harga} label="Total Pembayaran" />
        <ConfirmButton
          title="Konfirmasi Pemesanan"
          onPress={handleSubmit}
          isLoading={isLoading}
        />
        <BottomSpace marginBottom={20} />
      </RootContainer>
    </>
  );
};
export default PemesananLapangan;
