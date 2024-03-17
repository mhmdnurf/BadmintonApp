import React from 'react';
import Header from '../components/Header';
import RootContainer from '../components/RootContainer';
import DetailField from '../components/detail_member/DetailField';
import PerpanjangButton from '../components/detail_member/PerpanjangButton';

interface DetailMember {
  navigation: any;
}

const DetailMember = ({navigation}: DetailMember) => {
  const handleNavigatePerbaruiMember = () => {
    navigation.navigate('PerbaruiMember');
  };
  return (
    <>
      <RootContainer backgroundColor="white">
        <Header title="Detail Member" />
        <DetailField />
        <PerpanjangButton onPress={handleNavigatePerbaruiMember} />
      </RootContainer>
    </>
  );
};

export default DetailMember;
