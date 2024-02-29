import React from 'react';
import Header from '../components/Header';
import RootContainer from '../components/RootContainer';
import DetailField from '../components/detail_pemesanan/DetailField';

const DetailPemesanan = () => {
  return (
    <>
      <RootContainer backgroundColor="white">
        <Header title="Detail Pemesanan" />
        <DetailField />
      </RootContainer>
    </>
  );
};

export default DetailPemesanan;
