import React from 'react';
import RootContainer from '../components/RootContainer';
import {Text} from 'react-native';
import Header from '../components/Header';

const Pembayaran = () => {
  return (
    <>
      <RootContainer backgroundColor="white">
        <Header title="Pembayaran" marginBottom={20} />
      </RootContainer>
    </>
  );
};

export default Pembayaran;
