import React from 'react';
import Header from '../components/Header';
import RootContainer from '../components/RootContainer';
import PerbaruiField from '../components/perbarui_member/PerbaruiField';
import ConfirmButton from '../components/perbarui_member/ConfirmButton';

interface PerbaruiMember {
  navigation: any;
}

const PerbaruiMember = ({navigation}: PerbaruiMember) => {
  const handleNavigatePembayaranMember = () => {
    navigation.navigate('PembayaranMember');
  };
  return (
    <>
      <RootContainer backgroundColor="white">
        <Header title="Perbarui Member" />
        <PerbaruiField />
        <ConfirmButton onPress={handleNavigatePembayaranMember} />
      </RootContainer>
    </>
  );
};

export default PerbaruiMember;
