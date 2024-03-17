import React from 'react';
import RootContainer from '../components/RootContainer';
import Header from '../components/Header';
import PemesananField from '../components/pemesanan/PemesananField';
import TotalHarga from '../components/pemesanan/TotalHarga';
import BottomSpace from '../components/BottomSpace';
import ConfirmButton from '../components/pemesanan/ConfirmButton';

interface PemesananLapangan {
  route: any;
  navigation: any;
}

const PemesananLapangan = ({route, navigation}: PemesananLapangan) => {
  const {waktuBooking, tanggalPemesanan, dataLapangan, lapangan} = route.params;

  const [lamaBermain, setLamaBermain] = React.useState('2 Jam');

  const lapanganNumber = lapangan.split(' ')[1];

  const handleSubmit = () => {
    console.log({
      // lamaBermain,
      // waktuBooking,
      // tanggalPemesanan,
      // lapangan: lapanganNumber,
      dataLapangan,
    });
    // navigation.navigate('Pembayaran');
  };

  return (
    <>
      <RootContainer backgroundColor="white">
        <Header title="Pemesanan Lapangan" marginBottom={20} />
        <PemesananField
          lamaBermain={lamaBermain}
          onValueChange={itemValue => setLamaBermain(itemValue)}
          bookingValue={waktuBooking}
          tanggalValue={tanggalPemesanan}
          lapanganValue={lapanganNumber}
          lokasiValue={dataLapangan.namaGOR}
        />
        <TotalHarga harga={60000} label="Total Pembayaran" />
        <ConfirmButton title="Konfirmasi Pemesanan" onPress={handleSubmit} />
        <BottomSpace marginBottom={20} />
      </RootContainer>
    </>
  );
};
export default PemesananLapangan;
