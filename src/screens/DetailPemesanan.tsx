import React from 'react';
import Header from '../components/Header';
import RootContainer from '../components/RootContainer';
import DetailField from '../components/detail_pemesanan/DetailField';
import BottomSpace from '../components/BottomSpace';

const DetailPemesanan = () => {
  return (
    <>
      <RootContainer backgroundColor="white">
        <Header title="Detail Pemesanan" />
        <DetailField />
        <BottomSpace marginBottom={40} />
      </RootContainer>
    </>
  );
};

export default DetailPemesanan;
